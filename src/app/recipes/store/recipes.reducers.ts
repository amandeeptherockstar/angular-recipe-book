import { Recipe } from '../recipes.model';
import { RecipesActions } from './recipes.actions';
import {
  FETCH_RECIPES,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  ERROR_RECIPES
} from './recipes.types';

export interface RecipesState {
  recipes: Recipe[];
  loaded: boolean;
}

const initialState: RecipesState = {
  recipes: [],
  loaded: false
};

export function recipesReducer(state = initialState, action: RecipesActions) {
  switch (action.type) {
    case FETCH_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
        loaded: true
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case UPDATE_RECIPE:
      const index = state.recipes.findIndex(
        recipe => recipe.recipeId === action.payload.id
      );
      const updatedRecipe = [...state.recipes];
      updatedRecipe[index] = { ...action.payload.recipe };
      return {
        ...state,
        recipes: updatedRecipe
      };
    case DELETE_RECIPE:
      const indx = state.recipes.findIndex(
        recipe => recipe.recipeId === action.payload
      );
      const deletedRecipes = [...state.recipes];
      deletedRecipes.splice(indx, 1);
      return {
        ...state,
        recipes: deletedRecipes
      };

    case ERROR_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes],
        loaded: false
      };
    default:
      return state;
  }
}
