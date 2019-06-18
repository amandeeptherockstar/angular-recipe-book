import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  // tslint:disable-next-line: no-input-rename
  @Input('recipe') recipe: Recipe;
  // @Output('selectedRecipe') selRecipe = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) {}

  // selectRecipe() {
  //   this.recipeService.selectedRecipe.emit(this.recipe);
  // }
}
