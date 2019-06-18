import { AuthActions } from './auth.actions';
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SET_TOKEN,
  ERROR_SIGN_UP,
  ERROR_SIGN_IN
} from './auth.types';

export interface AuthState {
  token: string;
  authenticated: boolean;
  errors: {
    code: string;
    message: string;
  };
}

const initialState: AuthState = {
  token: null,
  authenticated: false,
  errors: null
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        authenticated: true,
        errors: null
      };
    case SIGN_OUT:
      return {
        ...state,
        authenticated: false,
        token: null,
        errors: null
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        authenticated: true,
        errors: null
      };

    case ERROR_SIGN_UP:
    case ERROR_SIGN_IN:
      return {
        ...state,
        errors: {
          code: action.payload.code,
          message: action.payload.message
        }
      };
    default:
      return state;
  }
}
