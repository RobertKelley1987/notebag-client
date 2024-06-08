import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeRoute } from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import HomeForm from "./pages/HomePage/HomeForm";
import { newNoteRoute } from "./pages/HomePage/NewNoteForm";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomeForm /> },
      { path: "/new", ...newNoteRoute },
    ],
    ...homeRoute,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
