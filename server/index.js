import express from "express";
import cors from "cors";
import config from "./config/index.js";
import authRoute from "./routes/auth.route.js";
import carouselRoute from "./routes/carousel.route.js";
import noticeRoute from "./routes/notice.route.js";
import newsRoute from "./routes/news.route.js";
import eventRoute from "./routes/event.route.js";
import tagRoute from "./routes/tag.route.js";
import directorMessageRoute from "./routes/director_message.route.js";
import programRoute from "./routes/program.route.js";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "IICT server is running properly." });
});

app.use("/auth", authRoute);
app.use("/carousel", carouselRoute);
app.use("/notices", noticeRoute);
app.use("/news", newsRoute);
app.use("/events", eventRoute);
app.use("/tags", tagRoute);
app.use("/director-messages", directorMessageRoute);
app.use("/programs", programRoute);
const PORT = config.server.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
