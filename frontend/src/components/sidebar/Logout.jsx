import { Button } from "@/components/ui/button";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "@/Redux/slices/userSlices";
import { socket } from "@/socket/socket";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await axios.get(`${API_URL}/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Disconnect Socket
        if (socket.connected) {
          socket.disconnect();
        }

        // Clear Redux
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers([]));
        dispatch(setSelectedUser(null));

        toast.success("🎉 Logout Successful", {
          description: `${res.data.message}!`,
          duration: 2500,
        });

        // Redirect Login
        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error("❌ Logout Failed", {
        description:
          error.response?.data?.message ||
          "Please check your username and password.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="border-t border-white/10 p-4">
      <Button
        onClick={logoutHandler}
        variant="ghost"
        className="group w-full justify-start rounded-xl border border-red-500/20 bg-red-500/10 py-6 text-red-400 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
      >
        <LogOut className="mr-3 h-5 w-5 transition-transform group-hover:translate-x-1" />

        <div className="flex flex-col items-start">
          <span className="font-semibold">Logout</span>

          <span className="text-xs opacity-70">End your current session</span>
        </div>
      </Button>
    </div>
  );
};

export default Logout;
