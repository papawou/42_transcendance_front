import { getAccessToken, removeAccessToken } from "@/technical/AccessTokenManager";
import { isDef } from "@/technical/isDef";
import axios, { AxiosError, InternalAxiosRequestConfig, isAxiosError } from "axios";
import { dispatchCustomEvent } from "./events";

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

axiosInstance.interceptors.response.use(undefined, (error: Error | AxiosError) => {
    if (isAxiosError(error) && error.response?.status === 401) {
        removeAccessToken();
        dispatchCustomEvent("logout", undefined)
    }
    Promise.reject(error)
})




export default axiosInstance;