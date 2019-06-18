import { Action } from '@ngrx/store';
import {
  FETCH_RECIPES,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  TRY_FETCH_RECIPES,
  ERROR_RECIPES,
  TRY_DELETE_RECIPE,
  TRY_UPDATE_RECIPE,
  TRY_ADD_RECIPE
} from './recipes.types';
import { Recipe } from '../recipes.model';

export class TryFetchRecipes implements Action {
  readonly type = TRY_FETCH_RECIPES;
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class ErrorFetchRecipes implements Action {
  readonly type = ERROR_RECIPES;
}

export class TryAddRecipe implements Action {
  readonly type = TRY_ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class TryUpdateRecipe implements Action {
  readonly type = TRY_UPDATE_RECIPE;
  constructor(public payload: { id: string; recipe: Recipe }) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: { id: string; recipe: Recipe }) {}
}

export class TryDeleteRecipe implements Action {
  readonly type = TRY_DELETE_RECIPE;
  constructor(public payload: string) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: string) {}
}

export type RecipesActions =
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | TryFetchRecipes
  | ErrorFetchRecipes
  | TryDeleteRecipe
  | TryUpdateRecipe
  | TryAddRecipe;
