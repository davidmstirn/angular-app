import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./modules/not-found/not-found.component";

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/recipes' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
