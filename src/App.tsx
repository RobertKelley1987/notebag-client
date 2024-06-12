import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeRoute } from "./pages/HomePage/HomePage";
import { editNoteRoute } from "./pages/EditNotePage/EditNotePage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    ...homeRoute,
    children: [
      {
        path: "/notes/:noteId",
        ...editNoteRoute,
      },
    ],
  },
  {
    path: "/register",
    errorElement: <ErrorPage />,
    element: <RegisterPage />,
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
