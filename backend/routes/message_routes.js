import express from "express";
import {
  clearChat,
  getMessages,
  sendMessage,
} from "../controller/message_controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/send/:id", isAuth, sendMessage);
router.get("/get-message/:id", isAuth, getMessages);
router.delete("/clear/:id", isAuth, clearChat);

export default router;
