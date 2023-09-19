import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Egg", 4),
    new Ingredient("Cheese (cups)", 0.5),
    new Ingredient("Milk (cups)", .25),
    new Ingredient("Pepper (sweet)", 0.5),
    new Ingredient("Mushroom (small white)", 3),
  ];


  constructor() {
  }

  ngOnInit() {
  }

}
