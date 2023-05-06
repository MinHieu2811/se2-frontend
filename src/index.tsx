import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthProvider";
import { ToastProvider } from "./ui-component/toast/ToastContext";
import { ModalProvider } from "./context/ModalProvider";
import { CartProvider } from "./context/CartProvider";
import { AuthenModalProvider } from "./context/AuthModalProvider";
import { VoucherProvider } from "./context/VoucherContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <ModalProvider>
            <AuthenModalProvider>
              <VoucherProvider>
                <>
                  <App />
                </>
              </VoucherProvider>
            </AuthenModalProvider>
          </ModalProvider>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
