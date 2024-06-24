import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRefreshToken } from "../hooks/useRefreshToken";
import Loading from "./Loading";

function PrivateRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const location = useLocation();

  // Try refresh token on initial render
  useEffect(() => {
    async function getToken() {
      await refresh();
      setIsLoading(false);
    }

    getToken();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else if (auth.accessToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default PrivateRoute;
