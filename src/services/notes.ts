import type { AxiosInstance } from "axios";

class NoteService {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async create(noteId: string, title?: string, content?: string) {
    if (!title && !content) {
      return;
    }

    if (!noteId) {
      throw new Error("Note id required to create note.");
    }

    const { data } = await this.api.post("/notes", {
      noteId,
      title,
      content,
    });
    return data;
  }

  async update(noteId: string, title?: string, content?: string) {
    if (!noteId) {
      return;
    }

    const { data } = await this.api.put(`/notes/${noteId}`, {
      title,
      content,
    });
    return data;
  }

  async updateTags(noteId: string, tagId: string) {
    const { data } = await this.api.put(`/notes/${noteId}/tags`, { tagId });
    return data;
  }

  async findAll() {
    const { data } = await this.api.get("/notes");
    return data;
  }

  async findOne(noteId: string) {
    const { data } = await this.api.get(`/notes/${noteId}`);
    return data;
  }

  async delete(noteId: string) {
    const { data } = await this.api.delete(`/notes/${noteId}`);
    return data;
  }
}

export default NoteService;
