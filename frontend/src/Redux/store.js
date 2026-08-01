import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/messagesSlice";
import userReducer from "./slices/userSlices";

import { persistReducer, persistStore } from "redux-persist";
import storageModule from "redux-persist/lib/storage";

const storage = storageModule.default || storageModule;

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["authUser"],
};

// Sirf user reducer persist hoga
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
