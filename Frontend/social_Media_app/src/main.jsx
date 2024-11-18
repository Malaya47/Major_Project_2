import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store.js";
import { Provider } from "react-redux";
import ProfilePage from "./pages/ProfilePage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import BookmarkPage from "./pages/BookmarkPage.jsx";
import MainProfilePage from "./pages/MainProfilePage.jsx";
import LogInForm from "./pages/LogInForm.jsx";
import RegistrationForm from "./pages/RegistrationForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/profile/:name",
        element: <ProfilePage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/bookmark",
        element: <BookmarkPage />,
      },
      {
        path: "/mainProfile",
        element: <MainProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogInForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
