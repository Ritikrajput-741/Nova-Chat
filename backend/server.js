import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";

import connectDB from "./config/database.js";
import messageRoute from "./routes/message_routes.js";
import userRoute from "./routes/user_Routes.js";
import { initSocket } from "./socket/socket.js";

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(
  cors({
    origin: "https://nova-chat-chi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/chatapp/user", userRoute);
app.use("/api/chatapp/message", messageRoute);

const PORT = process.env.PORT || 8080;

const runServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

runServer();
