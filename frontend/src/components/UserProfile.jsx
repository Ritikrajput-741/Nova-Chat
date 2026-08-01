import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CalendarDays,
  CircleUserRound,
  Edit,
  Mail,
  MessageCircle,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const { authUser } = useSelector((store) => store.user);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}

        <header className="flex items-center justify-between border-b border-white/10 bg-black/20 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <ArrowLeft
              size={22}
              onClick={() => navigate(-1)}
              className="cursor-pointer transition hover:text-cyan-400"
            />

            <h1 className="text-lg font-semibold">My Profile</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
              <Edit size={15} />
              <span>Edit</span>
            </Button>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>

              <h2 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-lg font-extrabold text-transparent">
                NovaChat
              </h2>
            </div>
          </div>
        </header>

        {/* Profile */}

        <div className="flex flex-col items-center py-6">
          <Avatar className="h-32 w-32 border-4 border-cyan-500 shadow-xl shadow-cyan-500/30">
            <AvatarImage src={authUser?.profilePhoto} />

            <AvatarFallback className="text-4xl">
              {authUser?.fullname?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <h2 className="mt-4 text-2xl font-bold">{authUser?.fullname}</h2>

          <p className="text-slate-400">@{authUser?.username}</p>

          <span className="mt-3 rounded-full bg-green-500/20 px-4 py-1 text-sm font-medium text-green-400">
            🟢 Online
          </span>
        </div>

        {/* Details */}

        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="mb-5 border-b border-white/10 pb-2 text-lg font-semibold">
            Account Information
          </h3>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <CircleUserRound className="text-cyan-400" />

              <div>
                <p className="text-sm text-slate-400">Full Name</p>
                <p className="text-base font-medium">{authUser?.fullname}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <User className="text-cyan-400" />

              <div>
                <p className="text-sm text-slate-400">Username</p>
                <p className="text-base">@{authUser?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-cyan-400" />

              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-base">{authUser?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <CircleUserRound className="text-cyan-400" />

              <div>
                <p className="text-sm text-slate-400">User ID</p>
                <p className="break-all text-xs text-slate-300">
                  {authUser?._id}
                </p>
              </div>
            </div>

            {authUser?.createdAt && (
              <div className="flex items-center gap-4">
                <CalendarDays className="text-cyan-400" />

                <div>
                  <p className="text-sm text-slate-400">Member Since</p>

                  <p className="text-base">
                    {new Date(authUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}

        <div className="mx-auto mt-6 max-w-xl border-t border-white/10 py-5 text-center">
          <p className="text-sm text-slate-500">
            Powered by{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text font-bold text-transparent">
              NovaChat
            </span>
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Connect • Chat • Share Securely
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
