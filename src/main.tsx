import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-purple-600 text-white text-3xl p-4 rounded-lg">
      Tailwind should be purple and white!
    </div>
    <App />
  </React.StrictMode>
);
