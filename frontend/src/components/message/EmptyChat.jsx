import { MessageCircleMore } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10">
          <MessageCircleMore size={48} className="text-cyan-400" />
        </div>

        <h1 className="mt-6 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 bg-clip-text text-transparent text-2xl font-extrabold ">
          Welcome to NovaApp
        </h1>

        <p className="mt-3 text-slate-400">
          Select a conversation from the sidebar and start chatting instantly.
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;
