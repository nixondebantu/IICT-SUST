import jwt from "jsonwebtoken";
import config from "../config/index.js";

const signToken = (payload, expiresIn) => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

export { signToken, verifyToken };