import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// api
import ProductsService from '@/api/products/products.service';

// types
import type { GetAllProductParams, GetAllProducts } from '@/api/products/products.types';
import type { Sizes, SortBy } from '@/types/enums.types';

// data
import { PAGE_LIMIT } from '@/data/main';

export interface Filters {
  priceRange: [number, number];
  size: Sizes | null;
  sortBy: SortBy | 'none';
  category: string | null;
}

export const useProducts = (initialParams: GetAllProductParams = {}) => {
  const [page, setPage] = useState<number>(initialParams.page ?? 1);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [Number(initialParams.minPrice) || 0, Number(initialParams.maxPrice) || 2000],
    size: (initialParams.size as Sizes) ?? null,
    sortBy: (initialParams.sortBy as SortBy) ?? 'none',
    category: initialParams.category ?? null,
  });

  const params = useMemo(() => {
    const base: Record<string, any> = {
      page,
      limit: initialParams.limit ?? PAGE_LIMIT,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      size: filters.size ?? undefined,
      category: filters.category ?? undefined,
    };

    if (filters.sortBy && filters.sortBy !== 'none') {
      base.sortBy = filters.sortBy;
    }

    return base;
  }, [page, filters, initialParams.limit]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', params],
    queryFn: () => ProductsService.getAll(params),
    placeholderData: (prev: GetAllProducts | undefined) => prev,
  });

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 2000],
      size: null,
      sortBy: 'none',
      category: null,
    });
    setPage(1);
  };

  return {
    products: data?.data ?? [],
    total: data?.total ?? 0,
    page,
    setPage,
    filters,
    setFilter,
    isLoading,
    clearFilters,
    error,
  };
};
