import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HeaderComponent } from './modules/header/header.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./interceptors/auth-interceptor.service";
import {RecipeBookModule} from "./modules/recipe-book/recipe-book.module";
import {ShoppingListModule} from "./modules/shopping-list/shopping-list.module";
import {SharedModule} from "./modules/shared/shared.module";
import {AuthModule} from "./modules/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RecipeBookModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
