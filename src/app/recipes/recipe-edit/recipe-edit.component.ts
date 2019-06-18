import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import uuid from 'uuid/v4';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipes.model';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Store } from '@ngrx/store';
import { RecipeFeatureState } from '../store/recipe-feature.state';
import { map, take, switchMap } from 'rxjs/operators';
import { RecipesState } from '../store/recipes.reducers';
import { TryUpdateRecipe, TryAddRecipe } from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  editMode = false;
  recipeSubscription: Subscription;

  recipeId: string;
  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<RecipeFeatureState>
  ) {}

  ngOnInit() {
    //using ngrx approach
    this.recipeSubscription = this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.recipeId = paramMap.get('id');
        this.editMode = this.recipeId != null;
        this.initForm();
        console.log(this.editMode);
      }
    );

    // using service approach
    // this.recipeSubscription = this.route.paramMap.subscribe(
    //   (paramMap: ParamMap) => {
    //     this.recipeId = paramMap.get('id');
    //     this.editMode = this.recipeId != null;
    //     this.initForm();
    //     console.log(this.editMode);
    //   }
    // );
  }

  private initForm() {
    let id = uuid();
    let name = '';
    let imagepath = '';
    let description = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // get the recipe from service
      this.store
        .select('recipesList')
        .pipe(
          take(1),
          switchMap((recipeState: RecipesState) => of(recipeState.recipes))
        )
        .subscribe((recipes: Recipe[]) => {
          this.recipe = recipes.find(
            recipe => recipe.recipeId === this.recipeId
          );

          // this.recipe = this.recipeService.getRecipeById(this.recipeId);
          // console.log(this.recipe);
          id = this.recipe.recipeId;
          name = this.recipe.name;
          imagepath = this.recipe.imagePath;
          description = this.recipe.description;
          if (this.recipe.ingredients && this.recipe.ingredients.length > 0) {
            for (const ing of this.recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  id: new FormControl(ing.id),
                  ingredientName: new FormControl(
                    ing.name,
                    Validators.required
                  ),
                  amount: new FormControl(ing.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagepath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients
    });

    console.log(this.recipeForm);
  }

  addNewIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        id: new FormControl(uuid()),
        ingredientName: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*/)
        ])
      })
    );
  }

  onSubmit() {
    // add or update the form values'
    // prepre ing as we have changed the name from name to ingredientName, reverting logic is required
    const formIngredients: {
      id: string;
      ingredientName: string;
      amount: number;
    }[] = [...this.recipeForm.value['ingredients']];
    const modifiedIngredients: Ingredient[] = [];
    for (const ig of formIngredients) {
      modifiedIngredients.push(
        new Ingredient(ig.id, ig.ingredientName, ig.amount)
      );
    }

    const recipe: Recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      modifiedIngredients
      // this.recipeId || uuid(),
    );

    console.log(recipe);
    if (this.editMode) {
      // update
      // delete the recipeId property
      const recipeWithoutId = { ...recipe };
      delete recipeWithoutId.recipeId;
      // this.recipeService.updateRecipe(this.recipeId, recipeWithoutId);
      this.store.dispatch(
        new TryUpdateRecipe({
          id: this.recipeId,
          recipe: recipeWithoutId
        })
      );
    } else {
      const recipeWithoutId = { ...recipe };
      // delete the recipeId property
      delete recipeWithoutId.recipeId;
      // this.recipeService.addRecipes(recipeWithoutId);
      this.store.dispatch(new TryAddRecipe(recipeWithoutId));
    }
    // navigate after creating or updating a recipe
    this.router.navigate(['/recipes'], { relativeTo: this.route });
    // this.router.navigate(['recipes/', this.recipeId]);
  }

  onCancelRecipeEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteIngredient(index: number) {
    // this.recipeService.deleteIngredient(this.recipeId, ingredientId);
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

  /* getters for validations */
  get getRecipeName() {
    return this.recipeForm.get('name');
  }

  get getRecipeImagePath() {
    return this.recipeForm.get('imagePath');
  }

  get getRecipeDescription() {
    return this.recipeForm.get('description');
  }

  get getRecipeIngredients() {
    return this.recipeForm.get('ingredients');
  }
}
