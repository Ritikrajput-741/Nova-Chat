import { Conversation } from "../model/conversation_Model.js";
import { Message } from "../model/message_Model.js";
import { redisClient } from "../redis/redis.js";
import { getIO, getReceiverSocketId } from "../socket/socket.js";

/* SEND MESSAGE */

/* SEND MESSAGE */

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;

    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Find Conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Create Conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Create Message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: message.trim(),
    });

    // Populate sender & receiver
    await newMessage.populate([
      {
        path: "senderId",
        select: "fullname username profilePhoto",
      },
      {
        path: "receiverId",
        select: "fullname username profilePhoto",
      },
    ]);

    // Save message id
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Clear Redis cache
    const ids = [senderId.toString(), receiverId.toString()].sort();
    const cacheKey = `chat:${ids[0]}:${ids[1]}`;

    await redisClient.del(cacheKey);

    // Socket
    const io = getIO();
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully 🚀",
      data: newMessage,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* GET MESSAGES */

export const getMessages = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;

    const ids = [senderId.toString(), receiverId.toString()].sort();
    const cacheKey = `chat:${ids[0]}:${ids[1]}`;

    const cachedMessages = await redisClient.get(cacheKey);

    if (cachedMessages) {
      return res.status(200).json({
        success: true,
        source: "redis",
        messages: JSON.parse(cachedMessages),
      });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      populate: {
        path: "senderId receiverId",
        select: "fullname username profilePhoto",
      },
    });

    if (!conversation) {
      return res.status(200).json({
        success: true,
        messages: [],
      });
    }

    const last20Messages = conversation.messages.slice(-20);

    await redisClient.set(
      cacheKey,
      JSON.stringify(last20Messages),
      "EX",
      300
    );

    return res.status(200).json({
      success: true,
      source: "mongodb",
      messages: last20Messages,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* CLEAR CHAT */

export const clearChat = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      return res.status(200).json({
        success: true,
        message: "Chat already empty",
      });
    }

    await Message.deleteMany({
      _id: { $in: conversation.messages },
    });

    conversation.messages = [];
    await conversation.save();

    const ids = [senderId.toString(), receiverId.toString()].sort();
    const cacheKey = `chat:${ids[0]}:${ids[1]}`;

    await redisClient.del(cacheKey);

    return res.status(200).json({
      success: true,
      message: "Chat cleared successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};