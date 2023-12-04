import {Injectable} from "@angular/core";
import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient("Egg", 4),
    new Ingredient("Cheese (cups)", 0.5),
    new Ingredient("Milk (cups)", .25),
    new Ingredient("Pepper (sweet)", 0.5),
    new Ingredient("Mushroom (small white)", 3),
  ];

  ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  startedEditing: Subject<number> = new Subject<number>();

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    for (const ingredient of ingredients) {
      this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
