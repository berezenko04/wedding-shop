import { httpPost } from "@/middlewares/axios.middleware";

// types
import { LoginBody, RegisterBody } from "./auth.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  register: "/auth/register",
  login: "/auth/login",
} as const;

const AuthService = {
  async register(body: RegisterBody) {
    return httpPost<BaseResponseData>(R.register, body);
  },

  async login(body: LoginBody) {
    return httpPost<BaseResponseData>(R.login, body);
  },
};

export default AuthService;
