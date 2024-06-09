import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeRoute } from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import { editNoteRoute } from "./pages/HomePage/EditNotePage";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
