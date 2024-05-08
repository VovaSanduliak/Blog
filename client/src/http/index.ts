import axios from "axios";
import { API_URL } from "../constants";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  console.log("URL: ", API_URL);
  return config;
});

export default api;
