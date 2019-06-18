import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
// import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { map, take } from 'rxjs/operators';
import { AuthState } from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: AuthState) => {
        return authState.authenticated;
      })
    );
  }
}
