export type User = {
  email: string;
  password: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  name: string;
};

export type Modal = "note" | "tags" | "";
