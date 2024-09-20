// src/components/AppLayout.tsx
"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import ReduxWrapped from "./redux-wrapped";
import { ToastContainer } from "react-toastify";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ReduxWrapped>{children}</ReduxWrapped>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
};

export default AppLayout;
