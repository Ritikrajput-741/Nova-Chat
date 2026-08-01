import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addMessage } from "@/Redux/slices/messagesSlice";
import { socket } from "@/socket/socket";
import { playSendSound } from "@/utils/playSound";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { SendHorizonal, Smile } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const typingTimeout = useRef(null);

  const { selectedUser, authUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  // Typing
  const handleTyping = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", {
      senderId: authUser._id,
      receiverId: selectedUser._id,
    });

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: authUser._id,
        receiverId: selectedUser._id,
      });
    }, 1000);
  };

  // Emoji
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  // Send Message
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await axios.post(
        `${API_URL}/message/send/${selectedUser._id}`,
        { message },
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(addMessage(res.data.data));

        playSendSound();

        clearTimeout(typingTimeout.current);

        socket.emit("stopTyping", {
          senderId: authUser._id,
          receiverId: selectedUser._id,
        });

        setMessage("");
        setShowEmoji(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-white/10 bg-black/20 p-4 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        {/* Emoji */}
        <div className="relative">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => setShowEmoji((prev) => !prev)}
            className="text-slate-300 hover:bg-white/10 hover:text-yellow-400"
          >
            <Smile size={22} />
          </Button>

          {showEmoji && (
            <div className="absolute bottom-14 left-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
        </div>

        {/* Message Input */}
        <Input
          value={message}
          onChange={handleTyping}
          placeholder="Type your message..."
          className="h-11 rounded-full border-white/10 bg-white/5 text-white placeholder:text-slate-400 focus-visible:ring-cyan-500"
        />

        {/* Send */}
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim()}
          className="rounded-full bg-cyan-500 hover:bg-cyan-600"
        >
          <SendHorizonal size={20} />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
