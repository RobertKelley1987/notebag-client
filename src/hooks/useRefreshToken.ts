import { api } from "../services/api";
import { useAuth } from "./useAuth";

export function useRefreshToken() {
  const { setAuth } = useAuth();

  async function refresh() {
    const {
      data: { accessToken },
    } = await api.get("/tokens");
    setAuth((prev) => {
      return { ...prev, accessToken };
    });
    return accessToken;
  }

  return refresh;
}
