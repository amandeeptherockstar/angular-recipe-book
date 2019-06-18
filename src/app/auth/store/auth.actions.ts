import { Action } from '@ngrx/store';
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SET_TOKEN,
  TRY_SIGN_UP,
  ERROR_SIGN_UP,
  TRY_SIGN_IN,
  ERROR_SIGN_IN,
  TRY_SIGN_OUT
} from './auth.types';

export class TrySignIn implements Action {
  readonly type = TRY_SIGN_IN;
  constructor(public payload: { email: string; password: string }) {}
}

export class ErrorSignIn implements Action {
  readonly type = ERROR_SIGN_IN;
  constructor(public payload: { code: string; message: string }) {}
}

export class SignIn implements Action {
  readonly type = SIGN_IN;
}

export class TrySignOut implements Action {
  readonly type = TRY_SIGN_OUT;
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class TrySignUp implements Action {
  readonly type = TRY_SIGN_UP;
  constructor(public payload: { email: string; password: string }) {}
}

export class ErrorSignUp implements Action {
  readonly type = ERROR_SIGN_UP;
  constructor(public payload: { code: string; message: string }) {}
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export type AuthActions =
  | SignIn
  | SignOut
  | SignUp
  | SetToken
  | TrySignUp
  | ErrorSignUp
  | TrySignIn
  | ErrorSignIn;
