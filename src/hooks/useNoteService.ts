import NoteService from "../services/notes";
import { usePrivateApi } from "./usePrivateApi";

export function useNoteService() {
  const privateApi = usePrivateApi();
  return new NoteService(privateApi);
}
