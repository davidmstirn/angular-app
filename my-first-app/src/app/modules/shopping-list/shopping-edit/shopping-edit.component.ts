import {
  Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import {ShoppingListService} from "../../../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number)=> {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({ name: this.editedItem.name, amount: this.editedItem.amount })
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(
      form.value.name,
      form.value.amount);
    if(!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    this.editedItemIndex = null;
    this.editedItem = null;
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editedItemIndex = null;
    this.editedItem = null;
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    if(this.editMode){
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.editedItemIndex = null;
      this.editedItem = null;
      this.editMode = false;
      this.shoppingListForm.reset();
    }
  }
}
