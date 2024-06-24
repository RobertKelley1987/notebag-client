import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import users from "./services/users";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./layouts/Home";
import Auth from "./layouts/Auth";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import EditNotePage from "./pages/EditNotePage/EditNotePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Navigate to="/notes" />,
      },
      {
        path: "/notes",
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/notes/:noteId",
            element: <EditNotePage />,
          },
        ],
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
