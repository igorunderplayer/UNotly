import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./routes/error";
import { NotesPage } from "./routes/notes";
import { RootPage } from "./routes/root";

import "./index.css";
import { LoginPage } from "./routes/login";
import { RegisterPage } from "./routes/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
  },
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    path: "/notes",
    element: <NotesPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
