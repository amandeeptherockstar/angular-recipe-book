import { Ingredient } from 'src/app/shared/ingredients.model';

import {
  ADD_INGREDIENT,
  SELECT_INGREDIENT,
  CLEAR_INGREDIENT,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_INGREDIENTS
} from './shopping-list.types';
import { ShoppingListActions } from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;
  selectedIngredientId: string;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('ing1', 'Apples', 5),
    new Ingredient('ing2', 'Tomatoes', 10)
  ],
  selectedIngredient: null,
  selectedIngredientId: null
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case SELECT_INGREDIENT:
      const ig: Ingredient[] = state.ingredients.filter(
        ing => ing.id === action.payload
      );
      return {
        ...state,
        selectedIngredient: ig[0],
        selectedIngredientId: action.payload
      };
    case CLEAR_INGREDIENT:
      return {
        ...state,
        selectedIngredient: null,
        selectedIngredientId: null
      };
    case UPDATE_INGREDIENT:
      const index = state.ingredients.findIndex(ing => ing.id === action.id);
      const updateIngredients: Ingredient[] = [...state.ingredients];
      updateIngredients[index] = action.ingredient;
      return {
        ...state.ingredients,
        ingredients: updateIngredients,
        selectedIngredient: null,
        selectedIngredientId: null
      };
    case DELETE_INGREDIENT:
      const deleteIngredients: Ingredient[] = [...state.ingredients];
      const indx = state.ingredients.findIndex(ing => ing.id === action.id);
      deleteIngredients.splice(indx, 1);
      console.log('DELTE----------------ING');
      console.log(deleteIngredients);
      return {
        ...state.ingredients,
        ingredients: deleteIngredients,
        selectedIngredient: null,
        selectedIngredientId: null
      };
    case ADD_INGREDIENTS:
      return {
        ...state.ingredients,
        ingredients: [...state.ingredients, ...action.ingredients],
        selectedIngredient: null,
        selectedIngredientId: null
      };
    default:
      return state;
  }
}
