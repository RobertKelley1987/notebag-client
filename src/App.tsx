import { Navigate, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import UserNotesContextProvider from "./context/UserNotesContextProvider";
import UserTagsContextProvider from "./context/UserTagsContextProvider";
import IsSavingContextProvider from "./context/IsSavingContextProvider";
import ModalContextProvider from "./context/ModalContextProvider";
import users from "./services/users";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./layouts/Home";
import Auth from "./layouts/Auth";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import FormOpenContextProvider from "./context/FormOpenContextProvider";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/notes" />} />
          <Route
            path="/notes"
            element={
              <UserNotesContextProvider>
                <UserTagsContextProvider>
                  <ModalContextProvider>
                    <IsSavingContextProvider>
                      <FormOpenContextProvider>
                        <Home />
                      </FormOpenContextProvider>
                    </IsSavingContextProvider>
                  </ModalContextProvider>
                </UserTagsContextProvider>
              </UserNotesContextProvider>
            }
          />
        </Route>

        <Route element={<Auth />}>
          <Route
            path="/register"
            element={<AuthPage heading="Sign Up" authFn={users.register} />}
          />
          <Route
            path="/login"
            element={<AuthPage heading="Log In" authFn={users.login} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
