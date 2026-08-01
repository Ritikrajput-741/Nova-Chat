import { useState } from "react";
import { useSelector } from "react-redux";

import { MessageCircle } from "lucide-react";

import ConversationList from "./ConversationList";
import Logout from "./Logout";
import Profile from "./Profile";
import Search from "./Search";

const Sidebar = () => {
  const { selectedUser } = useSelector((store) => store.user);

  const [search, setSearch] = useState("");

  return (
    <aside
      className={`
        ${selectedUser ? "hidden" : "flex"}
        h-full
        w-full
        md:flex
        md:w-[350px]
        flex-col
        border-r
        border-white/10
        bg-black/20
      `}
    >
      {/* NovaChat Logo */}

      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/30">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>

        <div>
          <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-2xl font-extrabold tracking-wide text-transparent">
            NovaChat
          </h1>

          <p className="text-xs text-slate-400">Connect • Chat • Share</p>
        </div>
      </div>

      <Profile />

      <Search search={search} setSearch={setSearch} />

      <div className="flex-1 overflow-hidden">
        <ConversationList search={search} />
      </div>

      <Logout />
    </aside>
  );
};

export default Sidebar;
