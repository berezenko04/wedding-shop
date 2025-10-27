import { Pagination } from "@/types/base.types";
import { Sex, Sizes, SortBy } from "@/types/enums.types";

export type Product = {
  id: string;
  posterUrl: string;
  title: string;
  price: number;
  discount: number;
  available: boolean;
  slug: string;
};

export interface ProductExtended extends Product {
  description: string;
  sex: string;
  sizes: Sizes[];
  images: ProductImage[];
}

export type ProductImage = {
  id: string;
  url: string;
};

export interface GetAllProducts {
  data: Product[];
  total: number;
}

export type GetAllProductParams = Pagination & {
  size?: Sizes;
  sortBy?: SortBy;
  sex?: Sex;
  minPrice?: number;
  maxPrice?: number;
};
