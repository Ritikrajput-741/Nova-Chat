import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import UserDetails from "./components/UserDetails";
import UserProfile from "./components/UserProfile";
import { addMessage, markMessagesSeen } from "./Redux/slices/messagesSlice";
import {
  increaseUnread,
  moveConversationToTop,
  setOnlineUser,
  setTypingUser,
} from "./Redux/slices/userSlices";
import { socket } from "./socket/socket";
import { playReceiveSound } from "./utils/playSound";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute>
        <UserDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  const dispatch = useDispatch();

  const { authUser, selectedUser } = useSelector((store) => store.user);

  // Socket Connection hook
  useEffect(() => {
    if (authUser) {
      if (!socket.connected) {
        socket.connect();
      }

      socket.emit("registerUser", authUser._id);
    } else {
      if (socket.connected) {
        socket.disconnect();
      }
    }

    return () => {
      if (socket.connected && !authUser) {
        socket.disconnect();
      }
    };
  }, [authUser]);

  // Fetch OnlineUser data
  useEffect(() => {
    const handleOnlineUsers = (users) => {
      dispatch(setOnlineUser(users));
    };

    socket.on("getOnlineUser", handleOnlineUsers);

    return () => {
      socket.off("getOnlineUser", handleOnlineUsers);
    };
  }, [dispatch]);

  // Fetch messages
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      // Ignore own message
      if (newMessage.senderId._id === authUser?._id) return;

      // Move latest conversation to top
      dispatch(moveConversationToTop(newMessage.senderId._id));

      if (newMessage.senderId._id === selectedUser?._id) {
        dispatch(addMessage(newMessage));

        playReceiveSound();

        socket.emit("messageSeen", {
          senderId: newMessage.senderId._id,
          receiverId: authUser._id,
        });
      } else {
        dispatch(increaseUnread(newMessage.senderId._id));

        playReceiveSound();
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch, selectedUser, authUser]);

  // Socket for typing / stop-typing user
  useEffect(() => {
    const handleTyping = ({ senderId }) => {
      if (senderId === selectedUser?._id) {
        dispatch(setTypingUser(senderId));
      }
    };

    const handleStopTyping = ({ senderId }) => {
      if (senderId === selectedUser?._id) {
        dispatch(setTypingUser(null));
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [dispatch, selectedUser]);

  // socket for seen message
  useEffect(() => {
    const handleSeen = ({ senderId, receiverId }) => {
      dispatch(
        markMessagesSeen({
          senderId,
          receiverId,
        }),
      );
    };

    socket.on("messagesSeen", handleSeen);

    return () => {
      socket.off("messagesSeen", handleSeen);
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
