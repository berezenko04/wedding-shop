import { Pagination } from '@/types/base.types';
import { Sizes, SortBy } from '@/types/enums.types';

export type Product = {
  id: string;
  posterUrl: string;
  title: string;
  price: number;
  discount: number | null;
  slug: string;
};

export interface ProductExtended extends Product {
  description: string;
  sex: string;
  sizes?: Sizes[];
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
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type SearchResult = {
  title: string;
  slug: string;
};
