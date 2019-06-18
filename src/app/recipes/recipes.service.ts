import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FirebaseRecipe } from '../shared/recipe.interface';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { AuthState } from '../auth/store/auth.reducers';

@Injectable()
export class RecipeService {
  baseUrl = 'https://recipe-book-3154d.firebaseio.com';
  // selectedRecipe = new EventEmitter<Recipe>();
  recipeListUpdated = new Subject<Recipe[]>();
  recipeUpdated = new Subject<Recipe>();

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Real Juice',
    //   'A Juice for a healthy body',
    //   'https://images.pexels.com/photos/1208698/pexels-photo-1208698.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    //   [
    //     new Ingredient('i1', 'Strawberry', 3),
    //     new Ingredient('i2', 'Milk', 1),
    //     new Ingredient('i3', 'Sugar', 2)
    //   ]
    // ),
    // new Recipe(
    //   'Manchurian',
    //   'Mix of Vegitables with Boiled Materials',
    //   'https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //   [
    //     new Ingredient('i4', 'Potatoes', 3),
    //     new Ingredient('i5', 'Sauce', 1),
    //     new Ingredient('i6', 'Gravy', 2)
    //   ]
    // )
  ];

  constructor(
    private slService: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  getRecipesFromFirebase() {
    // if (!token) {
    //   console.log('Sign In First');
    //   return;
    // }
    // this.http.get(this.baseUrl + 'recipes.json?auth=' + token).subscribe(
    this.http.get(this.baseUrl + '/recipes.json').subscribe(
      (response: FirebaseRecipe[]) => {
        // console.log(response);
        const recipes: Recipe[] = [];
        for (let key in response) {
          const recipe: Recipe = {
            recipeId: key,
            name: response[key].name,
            description: response[key].description,
            imagePath: response[key].imagePath,
            ingredients: response[key].ingredients
          };
          recipes.push(recipe);
        }
        this.recipes = recipes;
        this.recipeListUpdated.next(this.recipes.slice());
      },
      err => {
        console.log(err);
        console.log('Sign In First');
      }
    );
  }

  getSingleRecipesFromFirebase(id: string): Observable<Recipe> {
    // const token = this.authService.getToken();

    return (
      this.http
        // .get(this.baseUrl + 'recipes/' + id + '.json?auth=' + token)
        .get(this.baseUrl + '/recipes/' + id + '.json')
        .pipe(
          map((recipe: Recipe) => {
            return {
              ...recipe,
              recipeId: id
            };
          })
        )
    );
    // .subscribe(
    //   (response: FirebaseRecipe[]) => {
    //     const recipes: Recipe[] = [];
    //     for (let key in response) {
    //       const recipe: Recipe = {
    //         recipeId: key,
    //         name: response[key].name,
    //         description: response[key].description,
    //         imagePath: response[key].imagePath,
    //         ingredients: response[key].ingredients
    //       };
    //       recipes.push(recipe);
    //     }
    //     return recipes;
    //   },
    //   err => console.log(err)
    // );
  }

  get getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: string) {
    this.recipeUpdated.next({
      ...this.recipes.find(recipe => recipe.recipeId === id)
    });
    return {
      ...this.recipes.find(recipe => recipe.recipeId === id)
    };
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addNewIngredients(ingredients);
  }

  set setRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeListUpdated.next(this.recipes.slice());
  }

  addRecipes(recipe: Recipe) {
    // get the token
    // const token = this.authService.getToken();
    // add recipe to firebase
    this.http
      // .post(this.baseUrl + '/recipes.json?auth=' + token, recipe)
      .post(this.baseUrl + '/recipes.json', recipe)
      .subscribe(
        (response: { name: string }) => {
          this.recipes.push({
            ...recipe,
            recipeId: response.name
          });
          // emit next val
          this.recipeListUpdated.next(this.recipes.slice());
        },
        err => console.log(err)
      );
  }

  updateRecipe(id: string, recipe: Recipe) {
    // get the token
    // const token = this.authService.getToken();
    // update recipe to firebase
    this.http
      // .put(this.baseUrl + `/recipes/${id}.json?auth=${token}`, recipe)
      .put(this.baseUrl + `/recipes/${id}.json`, recipe)
      .subscribe(
        (response: FirebaseRecipe) => {
          const index = this.recipes.findIndex(rec => rec.recipeId === id);
          this.recipes[index] = {
            ...response,
            ingredients: [...response.ingredients],
            recipeId: id
          };
          this.recipeListUpdated.next(this.recipes.slice());
        },
        err => console.log(err)
      );
  }

  deleteRecipe(id: string) {
    // get the token
    // const token = this.authService.getToken();
    // delete recipe from firebase
    this.http
      // .delete(this.baseUrl + `/recipes/${id}.json?auth=${token}`)
      .delete(this.baseUrl + `/recipes/${id}.json`)
      .subscribe(
        (response: Response) => {
          console.log(response);
          const index = this.recipes.findIndex(rec => rec.recipeId === id);
          this.recipes.splice(index, 1);
          this.recipeListUpdated.next(this.recipes.slice());
        },
        err => console.log(err)
      );
  }

  // deleteIngredient(recipeId: string, ingId: string) {
  //   const recipeIndex = this.recipes.findIndex(
  //     recp => recp.recipeId === recipeId
  //   );
  //   const ingredientIndex = this.recipes[recipeIndex].ingredients.findIndex(
  //     ing => ing.id === ingId
  //   );
  //   this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
  //   this.recipeListUpdated.next(this.recipes);
  // }

  // saveInitialData() {
  //   const recipes: Recipe[] = this.recipeService.getRecipes;
  //   for (let recipe of recipes) {
  //     const recipeMod = {
  //       name: recipe.name,
  //       imagePath: recipe.imagePath,
  //       description: recipe.description,
  //       ingredients: [...recipe.ingredients]
  //     };
  //     this.http
  //       .post(this.baseUrl + 'recipes.json', recipeMod)
  //       .subscribe(
  //         (response: Response) => console.log(response),
  //         err => console.log(err)
  //       );
  //   }
  // }
}
