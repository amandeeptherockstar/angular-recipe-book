import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { SingleRecipeResolver } from '../shared/single-recipe.resolver';
import { AuthService } from '../auth/auth.service';
// import { AuthGuard } from '../auth/auth.guard';
import { RecipeService } from '../recipes/recipes.service';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from '../shared/auth.interceptor';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [
    SharedModule,
    // as we need routerLink (in the headersComponent, we need RoutingModule exported by AppRoutingModule File)
    AppRoutingModule
  ],
  providers: [
    ShoppingListService,
    SingleRecipeResolver,
    AuthService,
    RecipeService
    // provide interceptor like this
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [
    // we need to export header component as i am using the selector of the header component (<app-header> in the app.component.ts template)
    HeaderComponent,
    // we need to export approuting module as we need the Routing Module in the App.Module.Ts file
    AppRoutingModule
  ]
})
export class CoreModule {}
