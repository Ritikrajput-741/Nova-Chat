import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const authUser = useSelector((store) => store.user.authUser);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/user-profile")}
      className="group relative w-full overflow-hidden border-b border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:bg-white/[0.06]"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-cyan-500 shadow-lg shadow-cyan-500/30">
              <AvatarImage src={authUser?.profilePhoto} />

              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-violet-600 font-bold text-white">
                {authUser?.fullname?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Online */}
            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-green-500" />

            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 animate-ping rounded-full bg-green-400 opacity-60" />
          </div>

          {/* User Info */}
          <div className="text-left">
            <h2 className="text-[16px] font-semibold text-white">
              {authUser?.fullname}
            </h2>

            <div className="mt-1 flex items-center gap-2">
              <MessageCircle size={14} className="text-cyan-400" />

              <p className="text-xs text-emerald-400">Online • NovaChat</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
           

            <p className="text-xs text-slate-500">View Profile</p>
          </div>

          <ChevronRight className="text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400" />
        </div>
      </div>
    </button>
  );
};

export default Profile;
