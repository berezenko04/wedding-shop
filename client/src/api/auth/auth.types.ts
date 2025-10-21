import { BaseResponseData } from "@/types/base.types";

export type RegisterBody = {
  email: string;
  password: string;
};

export type LoginBody = RegisterBody;

export type VerifyOtpBody = {
  email: string;
  otp: string;
};

export type VerifyOtpResponse = BaseResponseData & {
  resetToken: string;
};

export type ResetPasswordBody = {
  resetToken: string;
  password: string;
};
