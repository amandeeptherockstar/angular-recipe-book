import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { recipesReducer } from './store/recipes.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecipesEffects } from './store/recipes.effects';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailsComponent,
    RecipeItemComponent
  ],
  // CommonModule is the Module we need to import in every feature module (contains ngFor, ngIf all those directives)
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    StoreModule.forFeature('recipesList', recipesReducer),
    EffectsModule.forFeature([RecipesEffects])
  ],
  providers: [
    // provide interceptor like this
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class RecipesModule {}
