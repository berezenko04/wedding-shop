import { httpPost } from "@/middlewares/axios.middleware";

// types
import { LoginBody, RegisterBody, VerifyOtpBody, VerifyOtpResponse } from "./auth.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  register: "/auth/register",
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
  verifyOtp: "/auth/verify-otp",
} as const;

const AuthService = {
  async register(body: RegisterBody) {
    return httpPost<BaseResponseData>(R.register, body);
  },

  async login(body: LoginBody) {
    return httpPost<BaseResponseData>(R.login, body);
  },

  async sendForgotPasswordOtp(email: string) {
    return httpPost<BaseResponseData>(R.forgotPassword, { email });
  },

  async verifyOtp(body: VerifyOtpBody) {
    return httpPost<VerifyOtpResponse>(R.verifyOtp, body);
  },
};

export default AuthService;
