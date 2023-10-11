import {Component, OnInit} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const recipeId = this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(recipeId);
    this.route.params.subscribe((params) => {
      const recipeId = params['id'];
      this.recipe = this.recipeService.getRecipe(recipeId);
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
