import { BaseResponseData } from '@/types/base.types';

export type RegisterBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginBody = Omit<RegisterBody, 'firstName' | 'lastName'>;

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

export type ChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};
