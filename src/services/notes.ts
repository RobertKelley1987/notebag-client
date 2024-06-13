import { api } from "./api";

const notes = {
  create: async (noteId: string, title?: string, content?: string) => {
    if (!noteId) {
      throw new Error("Note id required to create note.");
    }

    if (!title && !content) {
      return;
    }
    const { data } = await api.post("/notes", { noteId, title, content });
    return data;
  },
  update: async (noteId: string, title?: string, content?: string) => {
    if (!noteId) {
      return;
    }

    const { data } = await api.put(`/notes/${noteId}`, { title, content });
    return data;
  },
  findAll: async () => {
    const { data } = await api.get("/notes");
    return data;
  },
  findOne: async (noteId: string) => {
    const { data } = await api.get(`/notes/${noteId}`);
    return data;
  },
  delete: async (noteId: string) => {
    const { data } = await api.delete(`/notes/${noteId}`);
    return data;
  },
};

export default notes;
