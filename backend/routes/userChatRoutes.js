import express from "express";
import UserChats from "../models/userChat.js";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware.js";

const router = express.Router();

router.get("/", verifyTokenMiddleware, async (req, res) => {
  const userId = req.verifiedToken.sub;
  try {
    const userChats = await UserChats.findOne({ userId });
    res.status(200).send(userChats?.chats || []);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user chats");
  }
});

export default router;