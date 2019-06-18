import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { TrySignIn } from '../store/auth.actions';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from '../store/auth.reducers';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  signinSubscription: Subscription;

  constructor(
    // private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.signinSubscription = this.store
      .select('auth')
      .pipe(
        map((authState: AuthState) => {
          return authState.errors;
        })
      )
      .subscribe((err: { code: string; message: string }) => {
        console.log(err);
        if (err !== null) {
          if (err.code === 'auth/user-not-found') {
            console.log('setting errors');
            this.form.controls['email'].setErrors({
              usernotfound: err.message
            });
          } else if (err.code === 'auth/wrong-password') {
            console.log('setting errors');
            this.form.controls['password'].setErrors({
              wrongpassword: err.message
            });
          } else if (err.code === 'auth/network-request-failed') {
            alert('Check your internet connection, Request Failed');
          }
        }
      });
  }

  ngOnDestroy() {
    this.signinSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(
      new TrySignIn({
        email,
        password
      })
    );
    // using auth service

    // this.authService
    //   .signin(email, password)
    //   .then(() => {
    //     this.router.navigate(['/recipes']);
    //     // get the token after signin
    //     // return firebase.auth().currentUser.getIdToken();
    //   })
    //   // .then(() => {
    //   //   // console.log(token, 'token');
    //   //   // sign in state changed
    //   //   // this.authService.signInState.next(true);
    //   //   // set back the token in the auth service
    //   //   // this.authService.setToken = token;

    //   //   this.router.navigate(['/recipes']);
    //   // })
    //   .catch(err => {
    //     console.log(err);
    //     this.authService.signInState.next(false);
    //     if (err.code === 'auth/user-not-found') {
    //       console.log('setting errors');
    //       form.controls['email'].setErrors({ usernotfound: err.message });
    //     } else if (err.code === 'auth/wrong-password') {
    //       console.log('setting errors');
    //       form.controls['password'].setErrors({ wrongpassword: err.message });
    //     } else if (err.code === 'auth/network-request-failed') {
    //       alert('Check your internet connection, Request Failed');
    //     }
    //   });
  }
}
