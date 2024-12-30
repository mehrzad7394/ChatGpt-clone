import express from "express";
import "dotenv/config";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChat.js";
import cookieParser from "cookie-parser";
import verifyTokenMiddleware from "./middlewares/verifyTokenMiddleware.js";
const port = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongo db");
  } catch (error) {
    console.log(error);
  }
};
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLICKEY,
  privateKey: process.env.IMAGE_KIT_PRIVATEKEY,
});

app.get("/api/test", verifyTokenMiddleware, async (req, res) => {
  res.status(200).send(req.verifiedToken);
});
app.post("/api/chats", verifyTokenMiddleware, async (req, res) => {
  const { text } = req.body;
  const userId = req.verifiedToken.sub;
  try {
    const newChat = new Chat({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text }],
        },
      ],
    });
    const savedChat = await newChat.save();

    // check if user chat exists
    const userChats = await UserChats.find({ userId: userId });
    // if doesnt exist create new one
    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat.id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUserChats.save();
    } else {
      // if exist,push the chat to exisitng array
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Creating chat");
  }
});
app.get("/api/userchats", verifyTokenMiddleware, async (req, res) => {
  const userId = req.verifiedToken.sub;
  try {
    const userChats = await UserChats.findOne({ userId });
    res.status(200).send(userChats.chats);
  } catch (error) {
    res.status(500).send("Error Fetching userchats");
  }
});
app.get("/api/chats/:id", verifyTokenMiddleware, async (req, res) => {
  const userId = req.verifiedToken.sub;
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(200).send(chat);
  } catch (error) {
    res.status(500).send("Error Fetching userchats");
  }
});
app.listen(port, () => {
  connect();
  console.log("server running");
});
