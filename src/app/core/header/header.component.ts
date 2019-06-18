import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../recipes/recipes.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../../recipes/recipes.model';
import { switchMap, map } from 'rxjs/operators';
// import { AuthService } from '../../auth/auth.service';
import { AppState } from 'src/app/store/app.reducers';
import { AuthState } from 'src/app/auth/store/auth.reducers';
import { TrySignOut } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // isAuthenticated: boolean = false;
  authState: Observable<AuthState>;
  isAuthenticated: boolean;
  authStateSubscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    // private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.authStateSubscription = this.authState.subscribe((authData: AuthState) => {
      this.isAuthenticated = authData.authenticated;
    });
    // this.signInStateSubscription = this.authService.signInState.subscribe(
    //   isAuth => {
    //     this.isAuthenticated = isAuth;
    //   }
    // );
    // this.isAuth();
  }

  saveData() {
    // this.dataStorage.saveInitialData();
    // this.dataStorage.checkData().pipe(switchMap(() => {
    //   if(!response){
    //     const recipes: Recipe[] = this.recipeService.getRecipes;
    //     for (let recipe of recipes) {
    //       this.dataStorage.saveInitialData(recipe)
    //         .subscribe(
    //           (response: Response) => console.log(response),
    //           err => console.log(err)
    //         );
    //     }
    //   }
    // }));
  }

  onLogout() {
    // this.authService.signout();
    this.store.dispatch(new TrySignOut());
    // this.isAuthenticated = false;
    this.router.navigate(['/signin']);
  }

  isAuth() {
    //this.isAuthenticated = this.authService.isAuthenticated();
    //console.log(this.isAuthenticated);
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }
}
