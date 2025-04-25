// src/api/axiosInstance.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

// 기본 axios 인스턴스 (토큰 불필요)
export const axiosWithoutToken = axios.create({
  baseURL: BASE_URL,
});

// 토큰이 필요한 axios 인스턴스
export const axiosWithToken = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터 - 토큰 자동 삽입
axiosWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
