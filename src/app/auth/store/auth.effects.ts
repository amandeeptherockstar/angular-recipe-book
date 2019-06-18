import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';

import {
  TRY_SIGN_UP,
  SIGN_UP,
  SET_TOKEN,
  ERROR_SIGN_UP,
  TRY_SIGN_IN,
  SIGN_IN,
  SIGN_OUT,
  TRY_SIGN_OUT
} from './auth.types';
import { TrySignUp, ErrorSignUp, TrySignIn, ErrorSignIn } from './auth.actions';
import { AppState } from 'src/app/store/app.reducers';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp: Observable<Action> = this.actions$.pipe(
    ofType(TRY_SIGN_UP),
    // now the further chain of operators will only executed if the dispatched action would be of type TRY_SIGN_UP
    map((action: TrySignUp) => {
      console.log('i reach');
      return action.payload;
    }),
    // use firebase to sign user up
    switchMap((payload: { email: string; password: string }) => {
      // firebase.auth() returns a promise and we want to stick with the observables, so we will use from operator of rxjs to convert a promise to observable
      return from(
        firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
      );
    }),
    switchMap(() => {
      // get the token
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      console.log(token);
      // navigate the user away
      this.router.navigate(['/recipes']);
      // combine multiple observables into one use mergeMap
      return [
        // dispatch two actions
        { type: SIGN_UP },
        { type: SET_TOKEN, payload: token }
      ];
    }),
    catchError((error: { code: string; message: string }, caught) => {
      console.log(error);
      this.store.dispatch(
        new ErrorSignUp({
          code: error.code,
          message: error.message
        })
      );
      return caught;

      // return of({
      //   type: ERROR_SIGN_UP,
      //   payload: {
      //     code: error.code,
      //     message: error.message
      //   }
      // });
    })
  );

  @Effect()
  authSignIn: Observable<Action> = this.actions$.pipe(
    ofType(TRY_SIGN_IN),
    map((action: TrySignIn) => {
      return action.payload;
    }),
    switchMap((payload: { email: string; password: string }) => {
      return from(
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
      );
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      // navigate the user away
      this.router.navigate(['/recipes']);
      return [{ type: SIGN_IN }, { type: SET_TOKEN, payload: token }];
    }),
    catchError((error: { code: string; message: string }, caught) => {
      this.store.dispatch(
        new ErrorSignIn({
          code: error.code,
          message: error.message
        })
      );
      return caught;
    })
  );

  @Effect()
  authLogout: Observable<Action> = this.actions$.pipe(
    ofType(TRY_SIGN_OUT),
    map(() => {
      console.log('i am here');
      firebase.auth().signOut();
      this.router.navigate(['/recipes']);
      // use of operator if you are using it with switchMap, because switchMap doesnt wrap
      // returned content into observable but of() does, and map always returns internal
      // contents wrapped into observable.

      // return of({
      //   type: SIGN_OUT
      // });
      return {
        type: SIGN_OUT
      };
    })

    // tap(() => {
    //   console.log('i am here');
    //   firebase.auth().signOut();
    //   this.store.dispatch(new SignOut());
    //   this.router.navigate(['/recipes']);
    // })
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
