import { createBrowserRouter, RouterProvider } from "react-router-dom";
import users from "./services/users";
import { homeRoute } from "./layouts/Home";
import EditNotePage from "./pages/EditNotePage/EditNotePage";
import TagsPage from "./pages/TagsPage";
import Auth from "./layouts/Auth";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    ...homeRoute,
    children: [
      {
        path: "/notes/:noteId",
        element: <EditNotePage />,
      },
      {
        path: "/tags",
        element: <TagsPage />,
      },
    ],
  },
  {
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/register",
        element: <AuthPage heading="Sign Up" authFn={users.register} />,
      },
      {
        path: "/login",
        element: <AuthPage heading="Log In" authFn={users.login} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
