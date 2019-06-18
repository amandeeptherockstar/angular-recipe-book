import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { RecipeService } from './recipes/recipes.service';
import { CoreModule } from './core/core.module';

// reducers
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
// effects
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
// router store module
import { StoreRouterConnectingModule } from '@ngrx/router-store';
// devtools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    // Core module has home and header components
    CoreModule,
    // order is important here recipesmodule must preceed approutingmodule
    // eager loading of RecipesModule by importing it here
    // RecipesModule,
    AppRoutingModule,
    // register reducers
    StoreModule.forRoot(reducers),
    // register Effects
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    // if environment is production dont use devtools
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    // RecipeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
