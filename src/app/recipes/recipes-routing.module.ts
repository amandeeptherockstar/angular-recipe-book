import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [
  {
    // path: 'recipes',
    // we have already added recipes to the app-routing.module, so make it empty path
    path: '',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent, canActivate: [AuthGuard] },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: RecipeDetailsComponent,
        canActivate: [AuthGuard]
        //resolve: { singleRecipe: SingleRecipeResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
