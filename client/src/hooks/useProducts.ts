import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// api
import ProductsService from "@/api/products/products.service";

// types
import type { GetAllProductParams, GetAllProducts } from "@/api/products/products.types";
import type { SortBy } from "@/types/enums.types";

// data
import { sortByCatalog } from "@/data/main";

export const useProducts = (initialParams: GetAllProductParams = {}) => {
  const [page, setPage] = useState<number>(initialParams.page ?? 1);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [sortBy, setSortBy] = useState<SortBy>(initialParams.sortBy ?? sortByCatalog[0].value);

  const params: GetAllProductParams = {
    ...initialParams,
    page,
    limit: initialParams.limit ?? 12,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    ...(sortBy ? { sortBy } : {}),
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", params],
    queryFn: () => ProductsService.getAll(params),
    placeholderData: (prev: GetAllProducts | undefined) => prev,
  });

  return {
    products: data?.data ?? [],
    total: data?.total ?? 0,
    page,
    setPage,
    sortBy,
    priceRange,
    setPriceRange,
    setSortBy,
    isLoading,
    error,
  };
};
