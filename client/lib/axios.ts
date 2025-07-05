// src/lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER2,
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
