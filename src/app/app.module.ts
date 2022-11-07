import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { LoadingBlockComponent } from './components/common/loading-block/loading-block.component';
import { HeaderBarComponent } from './components/common/header-bar/header-bar.component';
import { FooterBarComponent } from './components/common/footer-bar/footer-bar.component';
import { SideBarComponent } from './components/common/side-bar/side-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from './components/products/products.module';


@NgModule({
  declarations: [
    AppComponent,
    FooterBarComponent,
    HeaderBarComponent,
    LoadingBlockComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    ProductsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
