import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';

const routes: Routes = [
  {
    path: 'productos',
    children: [
      {
        path: '',
        component: ProductsListComponent,
      },
      {
        path: 'actualizar/:productId',
        component: UpdateProductComponent,
      },
      {
        path: 'actualizar',
        component: UpdateProductComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'productos',
  },
  {
    path: '**',
    redirectTo: 'productos',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
