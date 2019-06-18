import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import uuid from 'uuid/v4';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import {
  AddIngredient,
  ClearIngredient,
  UpdateIngredient,
  DeleteIngredient
} from '../store/shopping-list.actions';
import { ShoppingListState } from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingId: string;
  ingredient: Ingredient;
  subscription: Subscription;
  @ViewChild('f') ingForm: NgForm;
  editMode = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((data: ShoppingListState) => {
        console.log(data);
        if (data.selectedIngredientId) {
          this.ingredient = data.selectedIngredient;
          this.ingId = data.selectedIngredientId;
          // set editMode to true
          this.editMode = true;
          // mount the form
          this.ingForm.setValue({
            name: this.ingredient.name,
            amount: this.ingredient.amount
          });
        }
      });

    // this.subscription = this.shoppingListService.selectedIngredient.subscribe(
    //   (ingId: string) => {
    //     // set editMode to true
    //     this.editMode = true;
    //     this.ingId = ingId;
    //     this.ingredient = this.shoppingListService.getIngredientById(ingId);
    //     // mount the form
    //     this.ingForm.setValue({
    //       name: this.ingredient.name,
    //       amount: this.ingredient.amount
    //     });
    //   }
    // );
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearIngredient());
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      // update the ingredient
      const ing = new Ingredient(
        this.ingId,
        form.value.name,
        form.value.amount
      );
      // dispatch an action to update store
      this.store.dispatch(new UpdateIngredient(this.ingId, ing));
      // this.shoppingListService.updateIngredient(
      //   this.ingId,
      //   new Ingredient(this.ingId, form.value.name, form.value.amount)
      // );
    } else {
      // add new ingredient
      const ing = new Ingredient(uuid(), form.value.name, form.value.amount);
      // dispatch a new action to add new ingredient
      this.store.dispatch(new AddIngredient(ing));
      // this.shoppingListService.addNewIngredient(ing);
    }
    this.editMode = false;
    form.reset();
  }

  clearForm() {
    this.editMode = false;
    this.ingForm.reset();
    this.store.dispatch(new ClearIngredient());
  }

  deleteIngredient() {
    // dispatch a new action to deleted ingredient
    this.store.dispatch(new DeleteIngredient(this.ingId));
    // this.shoppingListService.deleteIngredient(this.ingId);
    this.editMode = false;
    this.ingForm.reset();
    // this.clearForm();
  }
}
