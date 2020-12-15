import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './error/error.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductListComponent} from './product-list/product-list.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyMaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import { ProductEditionComponent } from './product-edition/product-edition.component';
import {OrderProductComponent} from './order-product/order-product.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderEditionComponent } from './order-edition/order-edition.component';
import {AuthGuardService} from './service/auth-guard.service';

const appRoutes: Routes = [
  { path: 'product-list', component: ProductListComponent, canActivate: [ AuthGuardService ] },
  { path: 'product-order', component: OrderProductComponent , canActivate: [ AuthGuardService ]},
  { path: 'product-create',      component: ProductCreateComponent, canActivate: [ AuthGuardService ] },
  { path: 'product-edition/:id',      component: ProductEditionComponent, canActivate: [ AuthGuardService ] },
  { path: 'order-edition/:id',      component: OrderEditionComponent, canActivate: [ AuthGuardService ] },
  { path: 'order-create',      component: OrderCreateComponent, canActivate: [ AuthGuardService ] },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ProductCreateComponent,
    ProductListComponent,
    LoginComponent,
    ProductEditionComponent,
    OrderProductComponent,
    OrderCreateComponent,
    OrderEditionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MyMaterialModule,

    RouterModule.forRoot(
      appRoutes,
    ),
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [ErrorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
