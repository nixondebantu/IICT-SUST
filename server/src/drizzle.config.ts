import { defineConfig } from "drizzle-kit";
import config from "./config";

export default defineConfig({
  out: "./src/db/drizzle",
  schema: "./src/db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.url!,
  },
});
