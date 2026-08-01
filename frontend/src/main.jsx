import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import "./index.css";

import store, { persistor } from "./Redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster richColors position="bottom-right" />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
