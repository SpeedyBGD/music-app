import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/layout/MainLayout";
import "@/assets/styles/main.scss";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
