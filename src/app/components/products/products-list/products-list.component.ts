import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { AppState } from 'src/app/models/app-state';
import { Product } from 'src/app/models/product';
import { ProductsState } from 'src/app/models/products-state';
import { ProductsService } from 'src/app/services/products.service';
import * as ProductsActions from '../store/product.actions';
import {
  errorsSelector,
  isLoadingSelector,
  productsSelector,
} from '../store/product.selectors';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  // subscriptions = new Subscription();
  loadingProducts$: Observable<ProductsState['isLoading']>;
  error$: Observable<string | null>;
  products$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {
    this.loadingProducts$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorsSelector));
    this.products$ = this.store.pipe(select(productsSelector));
  }

  ngOnInit(): void {
    // this.products$ = this.productsService.getAllProducts();
    this.store.dispatch(ProductsActions.getProducts());
  }
}
