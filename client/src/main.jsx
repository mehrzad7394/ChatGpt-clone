import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homepage/HomePage.jsx";
import Dashboard from "./routes/dashboard/Dashboard.jsx";
import ChatPage from "./routes/chatpage/ChatPage.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import "./index.css";
import SignInPage from "./routes/signinpage/SignInPage.jsx";
import SignUpPage from "./routes/signuppage/SignUpPage.jsx";
import { ToastContainer } from "react-toastify";
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
