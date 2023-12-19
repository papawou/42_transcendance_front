import { getAccessToken } from "@/technical/AccessTokenManager";
import { isDef } from "@/technical/isDef";
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (isDef(token)) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
})


export default axiosInstance;