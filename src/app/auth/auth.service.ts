import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.reducers';
import { SignUp, SignIn, SetToken, SignOut } from './store/auth.actions';

// we need injectable as we need to inject the store
@Injectable()
export class AuthService {
  // token;
  signInState = new Subject<boolean>();

  constructor(private store: Store<AppState>) {}

  // set setToken(token) {
  //   this.token = token;
  // }

  signup(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          // fire the action of signup
          this.store.dispatch(new SignUp());
          if (firebase.auth().currentUser) {
            firebase
              .auth()
              .currentUser.getIdToken()
              .then((token: string) => {
                this.store.dispatch(new SetToken(token));
              })
              .catch(err => console.log(err));
          }
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  signin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(token => {
          // this.token = token;
          // this.store.dispatch()
          // console.log(token, 'token');
          this.store.dispatch(new SignIn());
          if (firebase.auth().currentUser) {
            firebase
              .auth()
              .currentUser.getIdToken()
              .then((token: string) => {
                this.store.dispatch(new SetToken(token));
              })
              .catch(err => console.log(err));
          }
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  autosignin() {}

  // getToken() {
  //   // if there is a token exist ?
  //   if (firebase.auth().currentUser) {
  //     firebase
  //       .auth()
  //       .currentUser.getIdToken()
  //       .then(token => {
  //         console.log(token);
  //         this.token = token;
  //       })
  //       .catch(err => console.log(err));
  //     return this.token;
  //   } else {
  //     // return null if user is not signed in
  //     return null;
  //   }
  // }

  // isAuthenticated() {
  //   return firebase.auth().currentUser !== null;
  // }

  signout() {
    firebase.auth().signOut();
    this.store.dispatch(new SignOut());
    // this.token = null;
  }
}
