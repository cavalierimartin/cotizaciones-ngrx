import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import * as ProductsActions from './product.actions';

@Injectable()
export class ProductsEffects {
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      mergeMap(() => {
        return this.productService.getAllProducts().pipe(
          map((products) => ProductsActions.getProductsSuccess({ products })),
          catchError((error) =>
            of(
              ProductsActions.getProductsFailure({ error: error.errorMessage })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}
}
