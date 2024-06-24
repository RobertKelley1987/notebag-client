import TagService from "../services/tags";
import { usePrivateApi } from "./usePrivateApi";

export function useTagService() {
  const privateApi = usePrivateApi();
  return new TagService(privateApi);
}
