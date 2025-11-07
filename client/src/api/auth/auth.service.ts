import { httpPost } from "@/middlewares/axios.middleware";

// types
import {
  ChangePasswordBody,
  LoginBody,
  RegisterBody,
  ResetPasswordBody,
  VerifyOtpBody,
  VerifyOtpResponse,
} from "./auth.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  register: "/auth/register",
  login: "/auth/login",
  refresh: "/auth/refresh",
  changePasword: "/auth/change-password",
  forgotPassword: "/auth/forgot-password",
  verifyOtp: "/auth/verify-otp",
  resetPassword: "/auth/reset-password",
  logout: "/auth/logout",
  logoutAnotherSession: (id: string) => `${R.logout}/${id}`,
  logoutAll: "/auth/logout-all",
} as const;

const AuthService = {
  async register(body: RegisterBody) {
    return httpPost<BaseResponseData>(R.register, body);
  },

  async login(body: LoginBody) {
    return httpPost<BaseResponseData>(R.login, body);
  },

  async refresh() {
    return httpPost<void>(R.refresh);
  },

  async changePassword(body: ChangePasswordBody) {
    return httpPost<BaseResponseData>(R.changePasword, body);
  },

  async sendForgotPasswordOtp(email: string) {
    return httpPost<BaseResponseData>(R.forgotPassword, { email });
  },

  async verifyOtp(body: VerifyOtpBody) {
    return httpPost<VerifyOtpResponse>(R.verifyOtp, body);
  },

  async resetPassword(body: ResetPasswordBody) {
    return httpPost<BaseResponseData>(R.resetPassword, body);
  },

  async logout() {
    return httpPost<BaseResponseData>(R.logout);
  },

  async logoutAnotherSession(id: string) {
    return httpPost<BaseResponseData>(R.logoutAnotherSession(id));
  },

  async logoutAll() {
    return httpPost<BaseResponseData>(R.logoutAll);
  },
};

export default AuthService;
