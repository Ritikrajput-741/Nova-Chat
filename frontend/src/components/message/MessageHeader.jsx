import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setMessages } from "@/Redux/slices/messagesSlice";
import { setSelectedUser } from "@/Redux/slices/userSlices";
import axios from "axios";
import {
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MessageHeader = () => {
  const dispatch = useDispatch();

  const { selectedUser, onlineUsers, typingUser } = useSelector(
    (store) => store.user,
  );

  const navigate = useNavigate();

  const online = onlineUsers.includes(selectedUser?._id);

  const isTyping = typingUser === selectedUser?._id;

  // CLEAR CHAT
  const clearChat = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await axios.delete(
        `${API_URL}/message/clear/${selectedUser._id}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(setMessages([]));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Voice Call
  const handlePhoneCall = () => {
    toast("📞 Voice Calling", {
      description:
        "Voice calling is under development and will be available soon.",
    });
  };

  // Video Call
  const handleVideoCall = () => {
    toast("🎥 Video Calling", {
      description:
        "Video calling is under development and will be available soon.",
    });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 px-6 py-4 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        {/* LEFT */}

        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => dispatch(setSelectedUser(null))}
            className="rounded-xl text-white hover:bg-white/10"
          >
            <ArrowLeft size={22} />
          </Button>

          {/* Avatar */}

          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20">
              <AvatarImage src={selectedUser?.profilePhoto} />

              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-violet-600 text-lg font-bold text-white">
                {selectedUser?.fullname?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {online && (
              <>
                <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-green-500" />

                <span className="absolute bottom-1 right-1 h-3.5 w-3.5 animate-ping rounded-full bg-green-400 opacity-60" />
              </>
            )}
          </div>

          {/* User */}

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white">
                {selectedUser?.fullname}
              </h2>

              <ShieldCheck size={16} className="text-cyan-400" />
            </div>

            <div className="flex items-center gap-2">
              {isTyping ? (
                <>
                  <span className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:.2s]" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:.4s]" />
                  </span>

                  <p className="text-sm text-cyan-400">Typing...</p>
                </>
              ) : (
                <>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      online ? "bg-green-500" : "bg-slate-500"
                    }`}
                  />

                  <p
                    className={`text-sm ${
                      online ? "text-green-400" : "text-slate-400"
                    }`}
                  >
                    {online ? "Online" : "Offline"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2">
          {/* NovaChat */}

         
          <Button
            size="icon"
            variant="ghost"
            onClick={handlePhoneCall}
            className="rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            <Phone size={20} />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={handleVideoCall}
            className="rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:scale-105 hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-400"
          >
            <Video size={20} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10">
              <MoreVertical className="h-5 w-5 text-white" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl border border-white/10 bg-slate-900 text-white"
            >
              <DropdownMenuItem
                onClick={() => navigate(`/profile/${selectedUser._id}`)}
                className="cursor-pointer"
              >
                👤 View Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={clearChat}
                className="cursor-pointer text-red-400 focus:text-red-400"
              >
                🗑 Clear Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default MessageHeader;
