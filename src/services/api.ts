import axios from "axios";

// const baseURL = "https://server.notebag.site";
const baseURL = "/";

export const api = axios.create({ baseURL, withCredentials: true });

export const privateApi = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
