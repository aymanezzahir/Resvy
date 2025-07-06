// src/lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials:true,
});

// Optionally, add interceptors
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error("Axios Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
