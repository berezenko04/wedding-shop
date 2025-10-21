import { httpPost } from "@/middlewares/axios.middleware";

// types
import { LoginBody, RegisterBody } from "./auth.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  register: "/auth/register",
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
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
};

export default AuthService;
