import axios from "axios";

const DEV_URL = "/";
const PROD_URL = "http://server.notebag.site";
const baseURL = DEV_URL;

export const api = axios.create({ baseURL, withCredentials: true });

export const privateApi = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
