import TagService from "../services/tags";
import { usePrivateApi } from "./usePrivateApi";

// Hook to provide an instance of tag service using private api.
export function useTagService() {
  const privateApi = usePrivateApi();
  return new TagService(privateApi);
}
