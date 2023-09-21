import { Component } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent {
  selectedRecipe: Recipe;

  onSelectRecipe(recipe: Recipe) {
    if(this.selectedRecipe?.name === recipe.name) {
      this.selectedRecipe = null;
    } else {
      this.selectedRecipe = recipe;
    }
  };
}
