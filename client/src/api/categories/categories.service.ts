import { httpGet } from "@/middlewares/axios.middleware";

// types
import { Category } from "./categories.types";

const R = {
  categories: "/categories",
} as const;

const CategoriesService = {
  async getAll() {
    return httpGet<Category[]>(R.categories);
  },
};

export default CategoriesService;
