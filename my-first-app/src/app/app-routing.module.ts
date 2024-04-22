import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipeBookComponent} from "./modules/recipe-book/recipe-book.component";
import {ShoppingListComponent} from "./modules/shopping-list/shopping-list.component";
import {NotFoundComponent} from "./modules/not-found/not-found.component";
import {RecipeDetailComponent} from "./modules/recipe-book/recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./modules/recipe-book/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./modules/recipe-book/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./services/recipes-resolver.service";
import {AuthComponent} from "./modules/auth/auth.component";
import {AuthGuard} from "./modules/auth/auth.guard";

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/recipes' },
  { path: 'recipes', component: RecipeBookComponent, canActivate: [AuthGuard], children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
