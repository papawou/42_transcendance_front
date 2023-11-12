import { UserJWT, addAccessToken, getAccessToken, getMetaToken, removeAccessToken } from "@/technical/AccessTokenManager";
import axiosInstance from "@/technical/AxiosInstance";
import Paths from "@/technical/Paths";
import { isDef } from "@/technical/isDef";
import { AxiosError, InternalAxiosRequestConfig, isAxiosError } from "axios";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextValue = {
    user?: UserJWT
    logout: () => void
    login: (name: string) => void
}

const AuthContext = createContext<AuthContextValue>(Object.create(null))

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserJWT>();
    const navigate = useNavigate()

    useEffect(() => {
        const token = getMetaToken();
        if (!isDef(token)) {
            setUser(undefined)
            return;
        }
        setUser(token)
    }, [])

    const handleLogout = useCallback(() => {
        removeAccessToken()
        setUser(undefined)
        navigate(Paths.Home)
    }, [navigate])

    const handleLogin = useCallback(async (name: string) => {
        if (isDef(user)) {
            console.warn("user already auth")
        }
        const res = await axiosInstance.post("/auth/login", { name })
        addAccessToken(res.data.access_token);
        const token = getMetaToken();
        if (!isDef(token)) { //should not happen
            handleLogout();
            return;
        }
        setUser(token)
    }, [handleLogout, user])

    //axios
    //set header
    const axiosHeaders = useCallback((config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (isDef(token)) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    }, [])
    useEffect(() => {
        const interceptor = axiosInstance.interceptors.request.use((config) => axiosHeaders(config));
        return () => axiosInstance.interceptors.request.eject(interceptor)
    }, [axiosHeaders])

    //catch 401
    const axiosErrorUnauthorized = useCallback((error: Error | AxiosError) => {
        if (isAxiosError(error) && error.status === 401) {
            handleLogout();
        }
        Promise.reject(error)
    }, [handleLogout])
    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(undefined, (err) => axiosErrorUnauthorized(err))
        return () => axiosInstance.interceptors.request.eject(interceptor)
    })

    const contextValue: AuthContextValue = useMemo(() => ({
        user: user,
        login: (name: string) => handleLogin(name),
        logout: () => handleLogout()
    }), [handleLogin, handleLogout, user])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}