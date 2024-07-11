import { api } from "../services/api";
import { useAuth } from "./useAuth";

export function useRefreshToken() {
  const { setAccessToken } = useAuth();

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
