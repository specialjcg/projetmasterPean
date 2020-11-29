import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './error/error.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductListComponent} from './product-list/product-list.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {MyMaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import { ProductEditionComponent } from './product-edition/product-edition.component';

const appRoutes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-create',      component: ProductCreateComponent },
  { path: 'product-edition/:id',      component: ProductEditionComponent },
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
    ProductEditionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MyMaterialModule,

  RouterModule.forRoot(
      appRoutes,
    )
  ],

  entryComponents: [ErrorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
