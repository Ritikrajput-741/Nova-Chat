import { ScrollArea } from "@/components/ui/scroll-area";
import { setMessages } from "@/Redux/slices/messagesSlice";
import { clearUnread } from "@/Redux/slices/userSlices";
import { socket } from "@/socket/socket";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Fetch Messages
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;

        const res = await axios.get(
          `${API_URL}/message/get-message/${selectedUser._id}`,
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          dispatch(setMessages(res.data.messages));

          // Clear unread count
          dispatch(clearUnread(selectedUser._id));

          // Mark messages as seen
          socket.emit("messageSeen", {
            senderId: selectedUser._id,
            receiverId: authUser._id,
          });
        }
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchMessages();
  }, [selectedUser, authUser, dispatch]);

  if (!messages.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-white">
        <h1 className="bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent">
          Hi{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
            {authUser.fullname}
          </span>
        </h1>

        <p className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
          No messages yet. Start the conversation 👋
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="min-h-0 flex-1">
      <div className="space-y-4 p-6">
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default Messages;
