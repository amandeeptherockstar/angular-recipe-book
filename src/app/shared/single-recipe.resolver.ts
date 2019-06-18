import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Recipe } from '../recipes/recipes.model';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipes/recipes.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SingleRecipeResolver implements Resolve<Recipe> {
  constructor(private recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.recipeService.getSingleRecipesFromFirebase(route.params['id']);
  }
}
