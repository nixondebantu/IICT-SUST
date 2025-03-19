import express, { Request, Response } from "express";
import { config } from "./config";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the express server of IICT, SUST." });
});

const PORT = config.server.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
