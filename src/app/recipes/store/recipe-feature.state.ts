import { RecipesState } from './recipes.reducers';
import { AppState } from 'src/app/store/app.reducers';

export interface RecipeFeatureState extends AppState {
  recipesList: RecipesState;
}
