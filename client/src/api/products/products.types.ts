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
