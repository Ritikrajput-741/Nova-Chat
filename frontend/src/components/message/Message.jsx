import { Check, CheckCheck } from "lucide-react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser } = useSelector((store) => store.user);

  const isMe = (message.senderId._id || message.senderId) === authUser._id;

  return (
    <div className={`mb-3 flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-sm rounded-2xl px-3 py-2 shadow-md ${
          isMe
            ? "bg-cyan-500 text-white"
            : "bg-white/10 text-white backdrop-blur-md"
        }`}
      >
        {/* Message */}

        <p className="break-words whitespace-pre-wrap">{message.message}</p>

        {/* Time & Seen */}

        <div
          className={`mt-2 flex items-center justify-end gap-1 text-xs ${
            isMe ? "text-cyan-100" : "text-slate-300"
          }`}
        >
          <span>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isMe &&
            (message.status === "seen" ? (
              <CheckCheck size={14} />
            ) : (
              <Check size={14} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
