import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipes.service';
// import { AppState } from '../../store/app.reducers';
import { FirebaseRecipe } from './../../shared/recipe.interface';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import { RecipeFeatureState } from '../store/recipe-feature.state';
import { RecipesState } from '../store/recipes.reducers';
import { map, switchMap } from 'rxjs/operators';
import { TryDeleteRecipe } from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeId: string;
  recipeSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RecipeFeatureState>
  ) {}

  ngOnInit() {
    this.recipeSubscription = this.route.paramMap
      .pipe(
        map((paramMap: ParamMap) => {
          this.recipeId = paramMap.get('id');
        }),
        switchMap(() => {
          return this.store.select('recipesList');
        }),
        map((recipeState: RecipesState) => {
          // return of(recipeState.recipes); // use of if you want to subscribe it, with switchMap
          return recipeState.recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        console.log('RECEIPES -------------');
        console.log(recipes);
        this.recipe = recipes.find(recipe => recipe.recipeId === this.recipeId);
      });

    // .subscribe(
    //   (paramMap: ParamMap) => {
    //     const id = paramMap.get('id');
    //     this.recipe = this.recipeService.getRecipeById(id);
    //     console.log(this.recipe, 'rec');
    //     if (!this.recipe.recipeId) {
    //       this.recipeService
    //         .getSingleRecipesFromFirebase(id)
    //         .subscribe((recipe: Recipe) => {
    //           this.recipe = recipe;
    //         });
    //     }
    //   }
    // );
    // using service way
    // this.recipeSubscription = this.route.paramMap.subscribe(
    //   (paramMap: ParamMap) => {
    //     const id = paramMap.get('id');
    //     this.recipe = this.recipeService.getRecipeById(id);
    //     console.log(this.recipe, 'rec');
    //     if (!this.recipe.recipeId) {
    //       this.recipeService
    //         .getSingleRecipesFromFirebase(id)
    //         .subscribe((recipe: Recipe) => {
    //           this.recipe = recipe;
    //         });
    //     }
    //   }
    // );
    // to load directly recipe from url like http://localhost:4200/recipes/-LcLSq9r2hr-4mZY1D-T
    // this.route.data.subscribe(
    //   (recipe: { singleRecipe: FirebaseRecipe }) =>
    //     (this.recipe = recipe.singleRecipe)
    // );
  }

  addToShoppingList() {
    // dispatch an action to add the ingredients to the shopping_list ingredients array
    // if there are no ingredients dont add
    if (this.recipe.ingredients && this.recipe.ingredients.length > 0) {
      this.store.dispatch(new AddIngredients(this.recipe.ingredients));
    } else {
      alert('No Ingredient to Add');
    }
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.recipe.recipeId);
    this.store.dispatch(new TryDeleteRecipe(this.recipeId));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
