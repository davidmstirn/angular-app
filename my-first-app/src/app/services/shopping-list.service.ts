import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../models/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient("Egg", 4),
    new Ingredient("Cheese (cups)", 0.5),
    new Ingredient("Milk (cups)", .25),
    new Ingredient("Pepper (sweet)", 0.5),
    new Ingredient("Mushroom (small white)", 3),
  ];

  ingredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    for (const ingredient of ingredients) {
      this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    }
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
