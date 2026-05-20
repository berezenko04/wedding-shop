import { httpGet } from '@/api/axios.middleware';

// types
import { GetAllProductParams, GetAllProducts, ProductExtended, SearchResult } from './products.types';

const R = {
  products: '/products',
  search: '/products/search',
  getBySlug: (slug: string) => `${R.products}/by-slug/${slug}`,
} as const;

const ProductsService = {
  async getAll(params: GetAllProductParams) {
    return httpGet<GetAllProducts>(R.products, { params });
  },

  async get(slug: string) {
    return httpGet<ProductExtended>(R.getBySlug(slug));
  },

  async search(text: string) {
    return httpGet<SearchResult[]>(R.search, { params: { text } });
  },
};

export default ProductsService;
