import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // change the home to newly generated HomeComponent
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // lazily load the module,
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  // all recipes related routes moved to the recipes feature module
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  }
  // all routes related to signin and signout moved to feature module
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
