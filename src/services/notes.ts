import type { AxiosInstance } from "axios";
import type { Note, Tag } from "../types";

class NoteService {
  api: AxiosInstance;
  controller: AbortController;

  constructor(api: AxiosInstance) {
    this.api = api;
    this.controller = new AbortController();
  }

  async create(note: Note) {
    if (!note.title && !note.content) {
      return;
    }

    if (!note.id) {
      throw new Error("Note id required to create note.");
    }

    const { data } = await this.api.post("/notes", note);
    return data;
  }

  async update(note: Note) {
    if (!note.id) {
      return;
    }

    const { data } = await this.api.put(`/notes/${note.id}`, note);
    return data;
  }

  async updateTags(noteId: string, tagId: string) {
    const { data } = await this.api.put(`/notes/${noteId}/tags`, { tagId });
    return data;
  }

  async findAll() {
    const { data } = await this.api.get("/notes", {
      signal: this.controller.signal,
    });
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

  abort() {
    this.controller.abort();
  }
}

export default NoteService;
