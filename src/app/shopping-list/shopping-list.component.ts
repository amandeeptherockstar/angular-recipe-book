import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

// import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { AppState } from '../store/app.reducers';
import { ShoppingListState } from './store/shopping-list.reducers';
import { SelectIngredient } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [];
  shoppingListState: Observable<ShoppingListState>;
  subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients;
    // this.subscription = this.shoppingListService.newIngredient.subscribe(
    //   (ings: Ingredient[]) => {
    //     this.ingredients = ings;
    //   }
    // );
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  selectIngredient(selectedIngredientId: string) {
    this.store.dispatch(new SelectIngredient(selectedIngredientId));
    // this.shoppingListService.selectedIngredient.next(selectedIngredientId);
  }
}
