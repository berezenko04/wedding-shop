export type Product = {
  id: string;
  posterUrl: string;
  title: string;
  price: number;
  discount: number;
  available: boolean;
};

export interface GetAllProducts {
  data: Product[];
  total: number;
}
