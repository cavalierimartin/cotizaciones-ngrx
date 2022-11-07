import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state';

export const selectFeature = (state: AppState) => state.products;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const productsSelector = createSelector(
  selectFeature,
  (state) => state.products
);
export const errorsSelector = createSelector(
  selectFeature,
  (state) => state.errors
);
