import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Knight\'s Taunting',
      'Elderberries',
      'https://www.intriguing.com/mp/_pictures/grail/large/HolyGrail054.jpg'
    ),
    new Recipe(
      'Camelot Delight',
      'Ham and Jam and Spam (a lot)',
      'https://www.intriguing.com/mp/_pictures/grail/large/HolyGrail041.jpg'
    ),
    new Recipe(
      "Roger's Special",
      'Shrubberies',
      'https://www.intriguing.com/mp/_pictures/grail/large/HolyGrail140.jpg'
    ),
  ];

  @Output() clickRecipe = new EventEmitter<Recipe>();

  onClickRecipe(recipe: Recipe) {
    this.clickRecipe.emit(recipe);
  }

  constructor() {}

  ngOnInit() {}
}
