import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Home/Homepage.jsx";
import PrivetRoutes from "./PrivetRoutes.jsx";
import EntryPage from "./EntryPage.jsx";
import {
  QueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: (
          <PrivetRoutes>
            <Homepage></Homepage>
          </PrivetRoutes>
        ),
      },
      {
        path: "/entry-page",
        element: <EntryPage></EntryPage>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
