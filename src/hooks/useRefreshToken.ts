import { api } from "../services/api";
import { useAuth } from "./useAuth";

export function useRefreshToken() {
  const { setAuth } = useAuth();

  async function refresh() {
    let accessToken = "";

    try {
      const { data } = await api.get("/tokens");
      accessToken = data.accessToken;
    } catch (error) {
      accessToken = "";
    }

    setAuth({ accessToken });
    return accessToken;
  }

  return refresh;
}
