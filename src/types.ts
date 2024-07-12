export type User = {
  email: string;
  password: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  tags: Tag[];
};

export type Tag = {
  id: string;
  name: string;
};

export type Modal = "editNote" | "editTags" | "";

export type NoteForm = Omit<Note, "id">;
