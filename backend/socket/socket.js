import { Server } from "socket.io";
import { Message } from "../model/message_Model.js";

// user store ( UserId : Socket.id )
let userSocketMap = {};

// Initialized Io
let io;
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5174",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  // Connect io with Client ( client -> socket.io )
  io.on("connection", (socket) => {

    // get user data from client
    socket.on("registerUser", (userId) => {
      userSocketMap[userId] = socket.id;

      //  Send / Emit Users from  userSocketMap = {}
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    });

    // Disconnect user
    socket.on("disconnect", () => {

      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    });

    // Set typing / stop-Typing
    socket.on("typing", ({ senderId, receiverId }) => {

      const receiverSocketId = getReceiverSocketId(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", { senderId });
      }
    });

    socket.on("stopTyping", ({ senderId, receiverId }) => {
      const receiverSocketId = getReceiverSocketId(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", { senderId });
      }
    });

    socket.on("messageSeen", async ({ senderId, receiverId }) => {
      await Message.updateMany(
        {
          senderId,
          receiverId,
          status: "sent",
        },
        {
          $set: {
            status: "seen",
          },
        },
      );

      const senderSocketId = getReceiverSocketId(senderId);

     if (senderSocketId) {
       io.to(senderSocketId).emit("messagesSeen", {
         senderId,
         receiverId,
       });
     }
    });
  });

  return io;
};

export const getIO = () => io;

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
