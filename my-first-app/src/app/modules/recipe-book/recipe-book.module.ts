import {NgModule} from "@angular/core";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeBookComponent} from "./recipe-book.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RecipeBookRoutingModule} from "./recipe-book-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeBookComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [RouterModule, SharedModule, ReactiveFormsModule, RecipeBookRoutingModule]
})
export class RecipeBookModule {}
