import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import chatRoutes from "./routes/chatRoutes.js";
import userChatRoutes from "./routes/userChatRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/chats", chatRoutes);
app.use("/api/userchats", userChatRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "../client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

// Connect to database and start server
connectDatabase();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});