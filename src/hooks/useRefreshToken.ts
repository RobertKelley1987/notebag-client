import { api } from "../services/api";
import { useAuth } from "./useAuth";

// Hook to create function that fetches a new access token.
export function useRefreshToken() {
  const { setAccessToken } = useAuth();

  // Function to get a new access token using refresh token
  // stored as an http-only cookie.
  async function refresh() {
    let accessToken = "";

    try {
      const { data } = await api.get("/tokens");
      accessToken = data.accessToken;
    } catch (error) {
      accessToken = "";
    }

    setAccessToken(accessToken);
    return accessToken;
  }

  return refresh;
}
