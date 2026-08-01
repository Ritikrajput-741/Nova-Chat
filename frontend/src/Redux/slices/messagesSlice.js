import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    markMessagesSeen: (state, action) => {
      const { senderId, receiverId } = action.payload;

      state.messages.forEach((message) => {
        const msgSender = message.senderId._id || message.senderId;

        const msgReceiver = message.receiverId._id || message.receiverId;

        if (msgSender === senderId && msgReceiver === receiverId) {
          message.status = "seen";
        }
      });
    },
  },
});

export const { setMessages, addMessage, markMessagesSeen } = messageSlice.actions;
export default messageSlice.reducer;
