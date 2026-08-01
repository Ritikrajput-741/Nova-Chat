import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: [],
    selectedUser: null,
    onlineUsers: [],
    typingUser: null,
    unreadMessages: {},
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setTypingUser: (state, action) => {
      state.typingUser = action.payload;
    },
    increaseUnread: (state, action) => {
      const senderId = action.payload;

      state.unreadMessages[senderId] =
        (state.unreadMessages[senderId] || 0) + 1;
    },
    clearUnread: (state, action) => {
      delete state.unreadMessages[action.payload];
    },
    moveConversationToTop: (state, action) => {
      const userId = action.payload;
      const index = state.otherUsers.findIndex((user) => user._id === userId);

      if (index === -1) return;
      const [user] = state.otherUsers.splice(index, 1);
      state.otherUsers.unshift(user);
    },
  },
});

export const {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
  setOnlineUser,
  setTypingUser,
  increaseUnread,
  clearUnread,
  moveConversationToTop,
} = userSlice.actions;

export default userSlice.reducer;
