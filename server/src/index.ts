import cors from "cors";
import express, { Request, Response } from "express";
import config from "./config";
import authRoute from "./routes/auth.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "IICT server is running properly." });
});

app.use("/auth", authRoute);

const PORT = config.server.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
