import { Ingredient } from '../shared/ingredients.model';
// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('ing1', 'Apples', 5),
    new Ingredient('ing2', 'Tomatoes', 10)
  ];

  // newIngredient = new EventEmitter<Ingredient[]>();
  newIngredient = new Subject<Ingredient[]>();
  selectedIngredient = new Subject<string>();

  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.newIngredient.emit(this.ingredients);
    this.newIngredient.next(this.ingredients);
  }

  addNewIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    // this.newIngredient.emit(this.ingredients);
    this.newIngredient.next(this.ingredients);
  }

  get getIngredients() {
    return this.ingredients.slice();
  }

  getIngredientById(id: string) {
    return this.ingredients.find(ing => ing.id === id);
  }

  // UPDATE INGREDIENT
  updateIngredient(id: string, ingredient: Ingredient) {
    const index = this.ingredients.findIndex(ing => ing.id === id);
    this.ingredients[index] = ingredient;
    // emit the new updated ingredients
    this.newIngredient.next(this.ingredients.slice());
  }

  // DELETE INGREDIENT
  deleteIngredient(id: string) {
    this.ingredients = this.ingredients.filter(ing => ing.id !== id);
    // emit the new updated ingredient
    this.newIngredient.next(this.ingredients.slice());
  }
}
