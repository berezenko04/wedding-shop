import type { Statuses } from "@/types/enums.types";

export interface AuthInitialState {
  isAuth: boolean;
  status: Statuses;
}
