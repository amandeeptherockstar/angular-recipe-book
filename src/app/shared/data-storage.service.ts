import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { FirebaseRecipe } from './recipe.interface';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipe() {}

  updateRecipe() {}

  deleteRecipe() {}
}
