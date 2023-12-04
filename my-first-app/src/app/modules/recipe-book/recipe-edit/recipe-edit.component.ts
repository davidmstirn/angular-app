import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../../services/recipe.service";
import {Recipe} from "../../../models/recipe.model";
import {Ingredient} from "../../../models/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  index: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.index = +params['id'];
      this.editMode = params['id'] !== undefined;
      this.initForm();
    })
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    let recipeName = this.recipeForm.value['name'];
    let recipeImagePath = this.recipeForm.value['imagePath'];
    let recipeDescription = this.recipeForm.value['description'];
    let ingredients = this.recipeForm.value['ingredients'].map((i: { name: string, amount: number }) => new Ingredient(i.name, i.amount));
    const newRecipe = new Recipe(recipeName, recipeDescription, recipeImagePath, ingredients);

    if(this.editMode) {
      this.recipeService.updateRecipe(this.index, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.router.navigate([".."], { relativeTo: this.route })
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [Validators.required, Validators.min(0)])
      })
    )
  }

  onCancel() {
    this.initForm();
    this.router.navigate([".."], { relativeTo: this.route })
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let ingredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.index);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe.ingredients){
        for(let i of recipe.ingredients) {
          ingredients.push(new FormGroup({
            'name': new FormControl(i.name, Validators.required),
            'amount': new FormControl(i.amount, [Validators.required, Validators.min(0)])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup<any>({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': ingredients
    });
  }
}
