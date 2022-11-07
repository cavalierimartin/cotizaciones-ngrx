import { Product } from "./product";

export interface ProductsState {
  isLoading: boolean;
  products: Product[];
  errors: string | null;
}
