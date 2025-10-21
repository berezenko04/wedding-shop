import { httpPost } from "@/middlewares/axios.middleware";

// types
import { RegisterBody } from "./auth.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  register: "/auth/register",
} as const;

const AuthService = {
  async register(body: RegisterBody) {
    return httpPost<BaseResponseData>(R.register, body);
  },
};

export default AuthService;
