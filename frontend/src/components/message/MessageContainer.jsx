import { useSelector } from "react-redux";
import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import EmptyChat from "./EmptyChat";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);

  if (!selectedUser) {
    return (
      <section className="flex-1 flex items-center justify-center">
        <EmptyChat />
      </section>
    );
  }

  return (
    <section
      className={`
    ${selectedUser ? "flex" : "hidden"}
    md:flex
    flex-1
    flex-col
    overflow-hidden
    bg-white/5
  `}
    >
      <MessageHeader />
      <Messages />
      <MessageInput />
    </section>
  );
};

export default MessageContainer;
