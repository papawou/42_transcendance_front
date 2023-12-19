import { dispatchLogin, dispatchLogout, registerCustomEvent, removeCustomEvent } from "@/services/events";
import { UserJWT, addAccessToken, getAccessToken, getMetaToken, removeAccessToken } from "@/technical/AccessTokenManager";

import Paths from "@/technical/Paths";
import { isDef } from "@/technical/isDef";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextValue = {
    user?: UserJWT | null
    logout: () => void
    login: (jwt: string) => void
}

const AuthContext = createContext<AuthContextValue>(Object.create(null))

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserJWT | null>(getMetaToken());
    const navigate = useNavigate()

    const handleLogout = useCallback(() => {
        removeAccessToken()
        setUser(null)
        navigate(Paths.Home, { replace: true })
    }, [])

    const handleLogin = useCallback((jwt: string) => {
        addAccessToken(jwt);
        const token = getMetaToken();
        if (!isDef(token)) {
            dispatchLogout()
            return
        }
        setUser(token)
        navigate(Paths.Home, { replace: true })
        dispatchLogin()
    }, [])

    useEffect(() => {
        const token = getAccessToken()
        if (!isDef(token)) {
            dispatchLogout()
            return
        }
        handleLogin(token)
    }, [handleLogin])

    useEffect(() => {
        registerCustomEvent("logout", handleLogout);
        return () => removeCustomEvent("logout", handleLogout)
    }, [handleLogout])

    const contextValue: AuthContextValue = useMemo(() => ({
        user: user,
        login: (jwt: string) => handleLogin(jwt),
        logout: () => dispatchLogout()
    }), [handleLogin, user])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}