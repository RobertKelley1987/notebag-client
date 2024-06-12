import { api } from "./api";
import type { User } from "../types";

const users = {
  register: async (user: User) => {
    const { data } = await api.post("/users/register", user);
    return data;
  },
  login: async (user: User) => {
    const { data } = await api.post("/users/login", user);
    return data;
  },
  logOut: async () => {
    const { data } = await api.post("/users/logout");
    return data;
  },
  getSession: async () => {
    const { data } = await api.get("/users/sessions");
    return data;
  },
};

export default users;
