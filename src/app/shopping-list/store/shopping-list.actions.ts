import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredients.model';
import {
  ADD_INGREDIENT,
  SELECT_INGREDIENT,
  CLEAR_INGREDIENT,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_INGREDIENTS
} from './shopping-list.types';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class SelectIngredient implements Action {
  readonly type = SELECT_INGREDIENT;
  constructor(public payload: string) {}
}

export class ClearIngredient implements Action {
  readonly type = CLEAR_INGREDIENT;
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public id: string, public ingredient: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public id: string) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public ingredients: Ingredient[]) {}
}

export type ShoppingListActions =
  | AddIngredient
  | SelectIngredient
  | ClearIngredient
  | UpdateIngredient
  | DeleteIngredient
  | AddIngredients;
