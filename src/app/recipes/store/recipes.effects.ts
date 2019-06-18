import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, catchError } from 'rxjs/operators';

import {
  FETCH_RECIPES,
  TRY_FETCH_RECIPES,
  TRY_DELETE_RECIPE,
  DELETE_RECIPE,
  TRY_UPDATE_RECIPE,
  UPDATE_RECIPE,
  TRY_ADD_RECIPE,
  ADD_RECIPE
} from './recipes.types';
import { FirebaseRecipe } from 'src/app/shared/recipe.interface';
import { Recipe } from '../recipes.model';
import {
  TryFetchRecipes,
  ErrorFetchRecipes,
  TryDeleteRecipe,
  TryUpdateRecipe,
  TryAddRecipe
} from './recipes.actions';
import { AppState } from 'src/app/store/app.reducers';
import { Router } from '@angular/router';

@Injectable()
export class RecipesEffects {
  baseUrl = 'https://recipe-book-3154d.firebaseio.com';

  @Effect()
  recipeFetch: Observable<Action> = this.actions$.pipe(
    ofType(TRY_FETCH_RECIPES),
    switchMap((action: TryFetchRecipes) => {
      return this.http.get(this.baseUrl + '/recipes.json');
    }),
    map((response: FirebaseRecipe[]) => {
      // console.log('trying fetch');
      // console.log(response, 'response');
      const recipes: Recipe[] = [];
      for (let key in response) {
        const recipe: Recipe = {
          recipeId: key,
          name: response[key].name,
          description: response[key].description,
          imagePath: response[key].imagePath,
          ingredients: response[key].ingredients
        };
        recipes.push(recipe);
      }
      return {
        type: FETCH_RECIPES,
        payload: recipes
      };
    }),
    catchError((err, caught) => {
      // alert('Sign In First');
      console.log('Sign In First');
      this.router.navigateByUrl('signin');
      this.store.dispatch(new ErrorFetchRecipes());
      return caught;
    })
  );

  @Effect()
  recipeAdd: Observable<Action> = this.actions$.pipe(
    ofType(TRY_ADD_RECIPE),
    map((action: TryAddRecipe) => action.payload),
    switchMap((payload: Recipe) => {
      // const obs = this.http.put(this.baseUrl + `/recipes/${payload.id}.json`, payload.recipe);
      const obs = this.http.post(this.baseUrl + `/recipes.json`, payload).pipe(
        map((response: { name: string }) => {
          console.log(response.name, 'NAME');
          return response.name;
        })
      );

      const combined = combineLatest(
        obs,
        // here payload is object combineLatest expect observables, so convert object into observable using of opertor
        of(payload)
      );
      // return combined;
      return combined.pipe(map(result => [result[0], result[1]]));
    }),
    map((combined: any[]) => {
      // combined: ['-LdRsuisdXnjsd', {name: 'Momos', imagePath: 'path', description: 'Something very tasty', ingredients: [ {id: 'sdsdsd', name: 'Oil', amount: 1} ] }]
      console.log(combined, 'combined');
      const recipe = {
        ...combined[1],
        recipeId: combined[0]
      };
      return {
        type: ADD_RECIPE,
        payload: recipe
      };
    })
  );

  @Effect()
  recipeUpdate: Observable<Action> = this.actions$.pipe(
    ofType(TRY_UPDATE_RECIPE),
    map((action: TryUpdateRecipe) => action.payload),
    switchMap((payload: { id: string; recipe: Recipe }) => {
      // const obs = this.http.put(this.baseUrl + `/recipes/${payload.id}.json`, payload.recipe);
      const obs = this.http.put<Observable<Recipe>>(
        this.baseUrl + `/recipes/${payload.id}.json`,
        payload.recipe
      );
      const combined = combineLatest(
        obs,
        // here payload is object combineLatest expect observables, so convert object into observable using of opertor
        of(payload)
      );
      // return combined;
      return combined.pipe(map(result => [result[0], result[1]]));
    }),
    map((combined: any) => {
      // payload: [ {id: 'sdsdsadsd'}, {name: '', description: '', ingredients: [], imagePath: '' }]
      const recipe: Recipe = {
        ...combined[0],
        recipeId: combined[1].id
      };
      return {
        type: UPDATE_RECIPE,
        payload: recipe
      };
    })
  );

  @Effect()
  recipeDelete: Observable<Action> = this.actions$.pipe(
    ofType(TRY_DELETE_RECIPE),
    map((action: TryDeleteRecipe) => action.payload),
    switchMap((recipeId: string) => {
      const obs = this.http.delete(this.baseUrl + `/recipes/${recipeId}.json`);
      return combineLatest(obs, recipeId);
    }),
    map(([obs, recipeId]) => {
      return {
        type: DELETE_RECIPE,
        payload: recipeId
      };
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
