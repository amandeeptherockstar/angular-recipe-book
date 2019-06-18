import { ActionReducerMap } from '@ngrx/store';
import {
  ShoppingListState,
  shoppingListReducer
} from '../shopping-list/store/shopping-list.reducers';
import { AuthState, authReducer } from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
