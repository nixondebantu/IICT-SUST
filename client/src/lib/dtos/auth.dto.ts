import { z } from "zod";
import { loginValidator } from "../validators/auth.validator";

export type LoginRes = {
  message: string;
  token: string;
  expireIn: number;
};

export type LoginReq = z.infer<typeof loginValidator>;
