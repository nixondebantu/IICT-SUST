import jwt from "jsonwebtoken";
import config from "../config";

const signToken = (payload: { id: string }, expiresIn: number) => {
  return jwt.sign(payload, config.jwt.secret!, { expiresIn });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwt.secret!);
};

export { signToken, verifyToken };
