import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
