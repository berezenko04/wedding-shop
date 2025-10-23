import { Pagination } from "@/types/base.types";
import { Sizes, SortBy } from "@/types/enums.types";

export type Product = {
  id: string;
  posterUrl: string;
  title: string;
  price: number;
  discount: number;
  available: boolean;
  slug: string;
};

export interface GetAllProducts {
  data: Product[];
  total: number;
}

export type GetAllProductParams = Pagination & {
  size?: Sizes;
  sortBy?: SortBy;
  minPrice?: number;
  maxPrice?: number;
};
