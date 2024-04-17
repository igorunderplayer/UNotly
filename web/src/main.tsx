import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorPage } from "./routes/error";
import { NotesPage } from "./routes/notes";
import { RootPage } from "./routes/root";

import { LoginPage } from "./routes/login";
import { RegisterPage } from "./routes/register";

import "./index.css";
import { AuthProvider } from "./lib/contexts/AuthContext";

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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
