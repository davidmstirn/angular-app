import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Monty Python Recipe',
      'Elderberry Mash',
      'https://www.barfblog.com/wp-content/uploads/2018/05/Frenchman.jpg'
    ),
  ];

  constructor() {}

  ngOnInit() {}
}
