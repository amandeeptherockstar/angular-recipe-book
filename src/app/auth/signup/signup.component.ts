import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { TrySignUp } from '../store/auth.actions';
import { map } from 'rxjs/operators';
import { AuthState } from '../store/auth.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  signupSubscription: Subscription;

  constructor(
    // private authService: AuthService
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.signupSubscription = this.store
      .select('auth')
      .pipe(
        map((authState: AuthState) => {
          return authState.errors;
        })
      )
      .subscribe((err: { code: string; message: string }) => {
        if (err !== null) {
          if (err.code === 'auth/weak-password') {
            console.log('setting errors');
            this.form.controls['password'].setErrors({
              weakpassword: err.message
            });
          } else if (err.code === 'auth/email-already-in-use') {
            console.log('setting errors');
            this.form.controls['email'].setErrors({
              alreadyinuse: err.message
            });
          }
        }
      });
  }

  ngOnDestroy() {
    this.signupSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(
      new TrySignUp({
        email,
        password
      })
    );

    // this.authService
    //   .signup(email, password)
    //   .then(() => console.log('Success'))
    //   .catch(err => {
    //     console.log(err);
    //     if (err.code === 'auth/weak-password') {
    //       console.log('setting errors');
    //       form.controls['password'].setErrors({ weakpassword: err.message });
    //     } else if (err.code === 'auth/email-already-in-use') {
    //       console.log('setting errors');
    //       form.controls['email'].setErrors({ alreadyinuse: err.message });
    //     }
    //   });
  }

  log(password) {
    // console.log(password);
  }
}
