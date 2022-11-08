import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { productReducers } from './store/product.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/product.effects';
import { LoadingModule } from '../shared/loading/loading.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UpdateProductComponent } from './update-product/update-product.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductsListComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('products', productReducers),
    EffectsModule.forFeature([ProductsEffects]),
    LoadingModule
  ],
})
export class ProductsModule {}
