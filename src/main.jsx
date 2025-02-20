import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Home/Homepage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Homepage></Homepage>
      },
      {
        path:'/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthProvider>
  </StrictMode>
);
