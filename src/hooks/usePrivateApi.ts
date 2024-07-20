import { useEffect } from "react";
import { privateApi } from "../services/api";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";

// Hook to provide an api instance with interceptors that handle expired access
// tokens.
export function usePrivateApi() {
  const refresh = useRefreshToken();
  const { accessToken } = useAuth();

  useEffect(() => {
    const reqIntercept = privateApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const resIntercept = privateApi.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevReq = err.config;
        if (err?.response?.status === 403 && !prevReq.sent) {
          prevReq.sent = true;
          const newToken = await refresh();
          prevReq.headers["authorization"] = `Bearer ${newToken}`;
          return privateApi(prevReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      privateApi.interceptors.request.eject(reqIntercept);
      privateApi.interceptors.response.eject(resIntercept);
    };
  }, [accessToken, refresh]);

  return privateApi;
}
