import { api } from "./api";
import type { User } from "../types";

const users = {
  register: async (user: User) => {
    const { data } = await api.post("/users/register", user);
    return data;
  },
  getSession: async () => {
    const { data } = await api.get("/users/sessions");
    return data;
  },
};

export default users;
