import { Navigate, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import UserNotesContextProvider from "./context/UserNotesContext";
import UserTagsContextProvider from "./context/UserTagsContext";
import IsSavingContextProvider from "./context/IsSavingContext";
import ModalContextProvider from "./context/ModalContext";
import FormOpenContextProvider from "./context/FormOpenContext";
import users from "./services/users";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./layouts/Home";
import Auth from "./layouts/Auth";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScreenSizeContextProvider, {
  ScreenSizeContext,
} from "./context/ScreenSizeContext";

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
                  <ScreenSizeContextProvider>
                    <ModalContextProvider>
                      <IsSavingContextProvider>
                        <FormOpenContextProvider>
                          <Home />
                        </FormOpenContextProvider>
                      </IsSavingContextProvider>
                    </ModalContextProvider>
                  </ScreenSizeContextProvider>
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
