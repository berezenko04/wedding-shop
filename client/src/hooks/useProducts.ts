import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// api
import ProductsService from "@/api/products/products.service";

// types
import type { Product } from "@/api/products/products.types";

export const useProducts = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = useQuery<{ data: Product[]; total: number }>({
    queryKey: ["products"],
    queryFn: async () => {
      return await ProductsService.getAll();
    },
    placeholderData: (prev) => prev,
  });

  return {
    products: data?.data ?? [],
    total: data?.total ?? 0,
    page,
    setPage,
    isLoading,
    error,
  };
};
