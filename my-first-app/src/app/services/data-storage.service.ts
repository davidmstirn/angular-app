import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {Recipe} from "../models/recipe.model";
import {map, tap} from "rxjs";

@Injectable({providedIn: "root"})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      "https://ng-complete-guide-recipe-786f8-default-rtdb.firebaseio.com/recipes.json",
      recipes
    ).subscribe({next: (res) => {
        console.log("Response: ", res);
      }});
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      "https://ng-complete-guide-recipe-786f8-default-rtdb.firebaseio.com/recipes.json"
    )
      .pipe(
        map(recipes => {
          return recipes.map((recipe): Recipe => ({...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}));
        }),
        tap(recipes => this.recipeService.setRecipes(recipes))
      );
  }
}
