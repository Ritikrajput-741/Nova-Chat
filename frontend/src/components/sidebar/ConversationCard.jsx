import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setSelectedUser } from "@/Redux/slices/userSlices";
import { useDispatch, useSelector } from "react-redux";

const ConversationCard = ({ user }) => {
  const dispatch = useDispatch();

  const { selectedUser, onlineUsers, unreadMessages } = useSelector(
    (store) => store.user,
  );

  // Online user
  const online = onlineUsers.includes(user._id);

  // Unread count
  const unreadCount = unreadMessages[user._id] || 0;

  const handleSelectedUser = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <button
      onClick={handleSelectedUser}
      className={`group relative mb-2 w-full overflow-hidden rounded-2xl border transition-all duration-300 ${
        selectedUser?._id === user._id
          ? "border-cyan-500/40 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-violet-500/15 shadow-lg shadow-cyan-500/10"
          : "border-white/5 bg-white/[0.03] hover:border-cyan-500/20 hover:bg-white/[0.06]"
      }`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-4 p-4">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="h-14 w-14 border-2 border-white/10 shadow-lg">
            <AvatarImage src={user.profilePhoto} />

            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-violet-600 font-bold text-white">
              {user.fullname?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Online */}
          {online && (
            <>
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-green-500" />

              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 animate-ping rounded-full bg-green-400 opacity-70" />
            </>
          )}
        </div>

        {/* User Details */}
        <div className="flex flex-1 flex-col overflow-hidden text-left">
          <h3 className="truncate text-[15px] font-semibold text-white">
            {user.fullname}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                online ? "bg-green-500" : "bg-slate-500"
              }`}
            />

            <p
              className={`truncate text-xs ${
                online ? "text-green-400" : "text-slate-400"
              }`}
            >
              {online ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <div className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-2 text-xs font-bold text-white shadow-lg shadow-green-500/30">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>

      {/* Selected Indicator */}
      {selectedUser?._id === user._id && (
        <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500" />
      )}
    </button>
  );
};

export default ConversationCard;
