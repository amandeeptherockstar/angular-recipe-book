import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes.service';
import { TryFetchRecipes } from '../store/recipes.actions';
import { RecipesState } from '../store/recipes.reducers';
import { take, switchMap, map } from 'rxjs/operators';
import { RecipeFeatureState } from '../store/recipe-feature.state';
import { AppState } from 'src/app/store/app.reducers';
import { AuthState } from 'src/app/auth/store/auth.reducers';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // recipes: Recipe[] = [];
  recipesState: Observable<RecipesState>;
  // recipeSubscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<RecipeFeatureState>
  ) {}

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes;

    // get recipes from firebase
    this.store.dispatch(new TryFetchRecipes());

    // this.store
    //   .select('recipesList')
    //   .pipe(map((recipeState: RecipesState) => recipeState.recipes))
    //   .subscribe((rec: Recipe[]) => {
    //     console.log(rec, 'RECIP{E}');
    //     this.recipes = rec;
    //   });

    this.recipesState = this.store.select('recipesList');

    // this.recipeService.getRecipesFromFirebase();

    // this.recipeSubscription = this.recipeService.recipeListUpdated.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
  }

  newRecipe() {
    // [routerLink]="['new']"
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    // this.recipeSubscription.unsubscribe();
  }
  // output the wasSelectedItem to again parent component
  // @Output('onSelectedItem') wasSelectedItem = new EventEmitter<Recipe>();

  // wasSelectedItemHandler(selectedItem: Recipe) {
  //   this.wasSelectedItem.emit(selectedItem);
  // }
}
