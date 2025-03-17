import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import App from "@/App";
import "@/assets/styles/main.scss";
const rootElement = document.getElementById("root");
if (!rootElement)
    throw new Error("Root element not found");
createRoot(rootElement).render(_jsx(App, {}));
