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
  logOut: async (token?: string) => {
    const { data } = await api.post("/users/logout", { token });
    return data;
  },
};

export default users;
