import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { HeaderComponent } from './modules/header/header.component';
import { RecipeDetailComponent } from './modules/recipe-book/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './modules/recipe-book/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './modules/recipe-book/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './modules/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './modules/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeBookComponent } from './modules/recipe-book/recipe-book.component';
import {DropdownDirective} from "./directives/dropdown.directive";
import { NotFoundComponent } from './modules/not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import { RecipeStartComponent } from './modules/recipe-book/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './modules/recipe-book/recipe-edit/recipe-edit.component';
import {RecipeService} from "./services/recipe.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeBookComponent,
    DropdownDirective,
    NotFoundComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
