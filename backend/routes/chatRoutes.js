import express from "express";
import Chat from "../models/chat.js";
import UserChats from "../models/userChat.js";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware.js";

const router = express.Router();

router.post("/", verifyTokenMiddleware, async (req, res) => {
  const { text } = req.body;
  const userId = req.verifiedToken.sub;
  try {
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text }] }],
    });
    const savedChat = await newChat.save();

    const userChats = await UserChats.findOne({ userId });
    if (!userChats) {
      const newUserChats = new UserChats({
        userId,
        chats: [{ _id: savedChat.id, title: text.substring(0, 40) }],
      });
      await newUserChats.save();
    } else {
      await UserChats.updateOne(
        { userId },
        {
          $push: {
            chats: { _id: savedChat._id, title: text.substring(0, 40) },
          },
        }
      );
    }
    res.status(201).send(newChat._id);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating chat");
  }
});

router.get("/:id", verifyTokenMiddleware, async (req, res) => {
  const userId = req.verifiedToken.sub;
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(200).send(chat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching chat");
  }
});

router.put("/:id", verifyTokenMiddleware, async (req, res) => {
  const userId = req.verifiedToken.sub;
  const { question, answer, img } = req.body;
  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];
  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      { $push: { history: { $each: newItems } } }
    );
    res.status(200).send(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating chat");
  }
});

export default router;
