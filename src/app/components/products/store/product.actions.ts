import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';

export const getProducts = createAction('[Products] Get Products');
export const getProductsSuccess = createAction(
  '[Products] Get Products success',
  props<{ products: Product[] }>()
);
export const getProductsFailure = createAction(
  '[Products] Get Products failure',
  props<{ error: string }>()
);
