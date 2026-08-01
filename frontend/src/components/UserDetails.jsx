import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();

  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const online = onlineUsers.includes(selectedUser?._id);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <ArrowLeft
              className="cursor-pointer transition hover:text-cyan-400"
              onClick={() => navigate(-1)}
            />

            <h1 className="text-xl font-semibold">User Profile</h1>
          </div>

          {/* NovaChat */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>

            <h2 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-xl font-extrabold text-transparent">
              NovaChat
            </h2>
          </div>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center py-10">
          <Avatar className="h-36 w-36 border-4 border-cyan-500 shadow-lg shadow-cyan-500/30">
            <AvatarImage src={selectedUser?.profilePhoto} />
            <AvatarFallback>{selectedUser?.fullname?.charAt(0)}</AvatarFallback>
          </Avatar>

          <h2 className="mt-5 text-3xl font-bold">{selectedUser?.fullname}</h2>

          <p className="text-slate-400">@{selectedUser?.username}</p>

          <span
            className={`mt-4 rounded-full px-5 py-1 text-sm font-medium ${
              online
                ? "bg-green-500/20 text-green-400"
                : "bg-slate-700/50 text-slate-300"
            }`}
          >
            {online ? "🟢 Online" : "⚫ Offline"}
          </span>
        </div>

        {/* Details Card */}
        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="mb-5 border-b border-white/10 pb-3 text-lg font-semibold">
            User Information
          </h3>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-slate-400">Full Name</p>
              <p className="mt-1 text-lg font-medium">
                {selectedUser?.fullname}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Username</p>
              <p className="mt-1 text-lg font-medium">
                @{selectedUser?.username}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Status</p>
              <p
                className={`mt-1 text-lg font-medium ${
                  online ? "text-green-400" : "text-slate-300"
                }`}
              >
                {online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pb-6 text-center text-sm text-slate-500">
          Powered by{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text font-bold text-transparent">
            NovaChat
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
