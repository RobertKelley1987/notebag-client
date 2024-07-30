import { Navigate, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import UserNotesContextProvider from "./context/UserNotesContext";
import UserTagsContextProvider from "./context/UserTagsContext";
import InitAppDataContextProvider from "./context/InitAppDataContext";
import ScreenSizeContextProvider from "./context/ScreenSizeContext";
import IsSavingContextProvider from "./context/IsSavingContext";
import ModalContextProvider from "./context/ModalContext";
import FormOpenContextProvider from "./context/FormOpenContext";
import { DemoContext } from "./context/DemoContext";
import users from "./services/users";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./layouts/Home";
import Auth from "./layouts/Auth";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";

const home = (
  <UserNotesContextProvider>
    <UserTagsContextProvider>
      <InitAppDataContextProvider>
        <ScreenSizeContextProvider>
          <IsSavingContextProvider>
            <Home />
          </IsSavingContextProvider>
        </ScreenSizeContextProvider>
      </InitAppDataContextProvider>
    </UserTagsContextProvider>
  </UserNotesContextProvider>
);

function App() {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <FormOpenContextProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Navigate to="/notes" />} />
              <Route
                path="/notes"
                element={
                  <DemoContext.Provider value={{ isDemo: false }}>
                    {home}
                  </DemoContext.Provider>
                }
              />
            </Route>

            <Route
              path="/demo"
              element={
                <DemoContext.Provider value={{ isDemo: true }}>
                  {home}
                </DemoContext.Provider>
              }
            />

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
        </FormOpenContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}

export default App;
