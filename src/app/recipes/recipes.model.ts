import { Ingredient } from '../shared/ingredients.model';

export class Recipe {
  public recipeId?: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    rname: string,
    desc: string,
    imagepath: string,
    ings: Ingredient[],
    id?: string
  ) {
    this.recipeId = id || '';
    this.name = rname;
    this.description = desc;
    this.imagePath = imagepath;
    this.ingredients = ings;
  }
}
