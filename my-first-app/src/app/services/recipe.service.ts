import {Recipe} from "../models/recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../models/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
      new Recipe(
        'Knight\'s Taunting',
        'Elderberries',
        'https://www.intriguing.com/mp/_pictures/grail/large/HolyGrail054.jpg',
        [
          new Ingredient("Elderberries", 24),
          new Ingredient("Sugar (c)", 0.5)]
      ),
      new Recipe(
        'Camelot Delight',
        'Ham and Jam and Spam (a lot)',
        'https://www.intriguing.com/mp/_pictures/grail/large/HolyGrail041.jpg',
        [
          new Ingredient("Ham (loaf)", 1),
          new Ingredient("Jam (jar)", 2),
          new Ingredient("Spam (lbs)", 3)]
      ),
      new Recipe(
        "Roger's Special",
        'Shrubberies',
        'https://www.intriguing.com/mp/_pictures/grail/large/HolyGrail140.jpg',
        [
          new Ingredient("Shrubbery", 1),
          new Ingredient("Shrubbery (slightly higher, to create a two-level effect)", 1),
          new Ingredient("Herring", 1)]
      ),
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
      return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
