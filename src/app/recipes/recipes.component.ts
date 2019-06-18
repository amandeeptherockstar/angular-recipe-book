import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipeService } from './recipes.service';
import { RecipeFeatureState } from './store/recipe-feature.state';
import { Store } from '@ngrx/store';
import { TryFetchRecipes } from './store/recipes.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  selectedRecipeItem: Recipe;

  constructor(
    private recipeService: RecipeService,
    private store: Store<RecipeFeatureState>
  ) {
    // this.recipeService.selectedRecipe.subscribe((recipe: Recipe) => {
    //   this.selectedRecipeItem = recipe;
    // });
  }

  // ngOnInit() {
  //   // this.store.dispatch(new TryFetchRecipes());
  // }

  // setSelectedItemHandler(selRecipe: Recipe) {
  //   this.selectedRecipeItem = selRecipe;
  // }
}
