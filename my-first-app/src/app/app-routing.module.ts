import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./modules/not-found/not-found.component";

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/recipes' },
  { path: 'recipes', loadChildren: () =>
      import('./modules/recipe-book/recipe-book.module').then((m) => m.RecipeBookModule)},
  { path: 'auth', loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)},
  { path: 'shopping-list', loadChildren: () =>
      import('./modules/shopping-list/shopping-list.module').then((m) => m.ShoppingListModule)},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  // You can make the preloading strategy more refined, such as only preloading certain modules.
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
