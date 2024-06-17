import { api } from "./api";

const tags = {
  create: async (name: string) => {
    const { data } = await api.post("/tags", { name });
    return data;
  },
  findAll: async () => {
    const { data } = await api.get("/tags");
    return data;
  },
  delete: async (tagId: string) => {
    const { data } = await api.delete(`/tags/${tagId}`);
    return data;
  },
};

export default tags;
