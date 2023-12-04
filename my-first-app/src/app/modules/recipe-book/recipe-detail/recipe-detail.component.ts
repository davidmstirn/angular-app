import {Component, OnInit} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeId: number;
  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.recipeId = this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(this.recipeId);
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
      this.recipe = this.recipeService.getRecipe(this.recipeId);
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate([".."], { relativeTo: this.route })
  }
}
