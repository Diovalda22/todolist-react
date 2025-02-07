import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "./Utils/routeList.jsx";

// File Utama yang menjalankan fungsi App dari App.jsx
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={routes} />
  </React.StrictMode>
);
