import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthContextProvider from "./context/AuthContextProvider";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ErrorBoundary>
);
