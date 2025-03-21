import { defineConfig } from "drizzle-kit";
import config from "./config/index.js";

export default defineConfig({
  out: "./db/drizzle",
  schema: "./db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.url,
  },
});
