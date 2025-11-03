import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// api
import ProductsService from "@/api/products/products.service";

// types
import type { GetAllProductParams, GetAllProducts } from "@/api/products/products.types";
import type { Sex, Sizes, SortBy } from "@/types/enums.types";

// data
import { sortByCatalog } from "@/data/main";

// constants
import { PAGE_LIMIT } from "@/constants";

export interface Filters {
  priceRange: [number, number];
  size: Sizes | null;
  sortBy: SortBy | "none";
  sex: Sex | null;
}

export const useProducts = (initialParams: GetAllProductParams = {}) => {
  const [page, setPage] = useState<number>(initialParams.page ?? 1);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 2000],
    size: null,
    sortBy: (initialParams.sortBy ?? sortByCatalog[0].value) as SortBy | "none",
    sex: null,
  });

  const params = useMemo(
    () => ({
      ...initialParams,
      page,
      limit: initialParams.limit ?? PAGE_LIMIT,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      size: filters.size ?? undefined,
      sex: filters.sex ?? undefined,
      ...(filters.sortBy && filters.sortBy !== "none" ? { sortBy: filters.sortBy } : {}),
    }),
    [page, filters, initialParams]
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", params],
    queryFn: () => ProductsService.getAll(params),
    placeholderData: (prev: GetAllProducts | undefined) => prev,
  });

  const setFilter = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ priceRange: [0, 2000], size: null, sortBy: "none", sex: null });
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
