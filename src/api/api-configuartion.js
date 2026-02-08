import axios from "axios";

const baseUrl = "https://dummyjson.com";
const timeout = 10000;

export const STALE_TIME = {
  SHORT: 60 * 1000,        // 1 min
  MEDIUM: 10 * 60 * 1000,   // 10 mins
  LONG: 60 * 60 * 1000,    // 1 hour
};

export const api = axios.create({
  baseURL: baseUrl, // Base URL
  timeout: timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
