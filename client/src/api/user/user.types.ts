import { Sex } from "@/types/enums.types";

export type User = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  sex: Sex;
};

export type UserSession = {
  id: string;
  deviceType: string;
  os: string;
  country: string;
  isCurrent: boolean;
  createdAt: Date;
};

export type UpdateUserBody = {
  firstName: string;
  lastName: string;
  sex: Sex;
};
