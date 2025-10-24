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

export const useProducts = (initialParams: GetAllProductParams = {}) => {
  const [page, setPage] = useState<number>(initialParams.page ?? 1);
  const [filters, setFilters] = useState({
    priceRange: [0, 2000] as [number, number],
    size: null as Sizes | null,
    sortBy: (initialParams.sortBy ?? sortByCatalog[0].value) as SortBy | "none",
    sex: null as Sex | null,
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

  const setSize = (size: Sizes | null) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, size }));
  };
  const setSex = (sex: Sex | null) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, sex }));
  };
  const setSortBy = (sortBy: SortBy) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, sortBy }));
  };
  const setPriceRange = (range: [number, number]) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  return {
    products: data?.data ?? [],
    total: data?.total ?? 0,
    page,
    setPage,
    filters,
    setPriceRange,
    setSize,
    setSortBy,
    setSex,
    isLoading,
    error,
  };
};
