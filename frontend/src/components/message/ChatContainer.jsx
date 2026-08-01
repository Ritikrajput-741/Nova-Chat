import { useSelector } from "react-redux";
import EmptyChat from "./EmptyChat";
import Messages from "./Messages";

const ChatContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);

  return (
    <div className="flex flex-1 flex-col">
      {selectedUser ? <Messages /> : <EmptyChat />}
    </div>
  );
};

export default ChatContainer;
