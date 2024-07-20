import NoteService from "../services/notes";
import { usePrivateApi } from "./usePrivateApi";

// Hook to provide an instance of note service using private api.
export function useNoteService() {
  const privateApi = usePrivateApi();
  return new NoteService(privateApi);
}
