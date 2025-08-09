import axios from "axios";

const BASE_URL =
    typeof window === 'undefined'
        ? process.env.NEXTAUTH_URL || 'http://localhost:3000'
        : '';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 25000,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        // مثلاً: const token = localStorage.getItem("token");
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// 👉 Error Handling globally
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
