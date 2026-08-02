import { io } from "socket.io-client";

const URL = "https://nova-chat-vmfa.onrender.com";

export const socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
});
