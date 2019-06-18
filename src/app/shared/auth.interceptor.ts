import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { switchMap, take } from 'rxjs/operators';
import { AuthState } from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor goes here');
    // clone a request before modifying it
    // let copiedReq = req;
    // if (this.authService.getToken() !== null) {
    //   // we are logged in now
    //   copiedReq = req.clone({
    //     params: req.params.set('auth', this.authService.getToken())
    //   });
    // }

    // why take(1) is used ?
    // ans: this.store.select sets a subscription to the authState, whenever state is changed of authState, switchMap is fired. to Take only first change and not respond to the subscription afterwards, we use take(1) to use the subscription once
    return this.store.select('auth').pipe(
      take(1),
      switchMap((authState: AuthState) => {
        console.log(authState);
        const copiedReq = req.clone({
          params: req.params.set('auth', authState.token)
        });
        // next.handle(req) will simply returns the original request to let it continue its journey
        return next.handle(copiedReq);
      })
    );
  }
}

// copiedReq = req.clone({
//   // set new headers like this
//   //headers: req.headers.append('','')
//   params: req.params.set('auth', this.authService.getToken())
// });
