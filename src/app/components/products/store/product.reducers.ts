import { createReducer, on } from '@ngrx/store';
import { ProductsState } from 'src/app/models/products-state';
import * as ProductsActions from './product.actions';

export const initialState: ProductsState = {
  isLoading: false,
  products: [],
  errors: null,
};

export const productReducers = createReducer(
  initialState,
  on(ProductsActions.getProducts, (state) => ({ ...state, isLoading: true })),
  on(ProductsActions.getProductsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    products: action.products,
  })),
  on(ProductsActions.getProductsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.error,
  }))
);
