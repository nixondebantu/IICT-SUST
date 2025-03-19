import "dotenv/config";

export const config = {
  db: {
    url: process.env.DATABASE_URL,
  },
  server: {
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
