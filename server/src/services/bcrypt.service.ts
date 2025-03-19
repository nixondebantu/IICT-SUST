import bcrypt from "bcrypt";

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export { comparePasswords, hashPassword };
