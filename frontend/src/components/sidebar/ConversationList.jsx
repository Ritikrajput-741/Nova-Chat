import { ScrollArea } from "@/components/ui/scroll-area";
import { setOtherUsers } from "@/Redux/slices/userSlices";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ConversationCard from "./ConversationCard";

const ConversationList = ({ search }) => {
  const dispatch = useDispatch();
  const otherUsers = useSelector((store) => store.user.otherUsers);

  useEffect(() => {
    const getOtherUsers = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;

        const res = await axios.get(`${API_URL}/user/all-other-user`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setOtherUsers(res.data.users));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    getOtherUsers();
  }, [dispatch]);

  const filteredUsers = otherUsers.filter((user) => {
    return (
      user.fullname.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <ScrollArea className="h-full p-3">
      <div className="space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <ConversationCard
              key={user._id}
              user={user}
              selected={index === 0}
            />
          ))
        ) : (
          <p className="mt-10 text-center text-slate-400">No user found</p>
        )}
      </div>
    </ScrollArea>
  );
};

export default ConversationList;
