import { registerCustomEvent, removeCustomEvent } from "@/services/events";
import { useDefaultServiceAuthControllerLogin } from "@/services/openapi/queries";
import { UserJWT, addAccessToken, getMetaToken, removeAccessToken } from "@/technical/AccessTokenManager";

import Paths from "@/technical/Paths";
import { isDef } from "@/technical/isDef";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { redirect } from "react-router-dom";

type AuthContextValue = {
    user?: UserJWT
    logout: () => void
    login: (name: string) => void
}

const AuthContext = createContext<AuthContextValue>(Object.create(null))

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserJWT>();
    const { isPending, mutateAsync: login } = useDefaultServiceAuthControllerLogin();

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
        redirect(Paths.Home)
    }, [])

    const handleLogin = useCallback(async (name: string) => {
        if (isDef(user)) {
            console.warn("user already auth")
        }
        try {
            const res = await login({ requestBody: { name } })
            addAccessToken(res.access_token);
            const token = getMetaToken();
            if (!isDef(token)) {
                throw ("should not happend")
            }
            setUser(token)
        }
        catch (e) {
            handleLogout()
        }
    }, [handleLogout, login, user])

    useEffect(() => {
        registerCustomEvent("logout", handleLogout);
        return () => removeCustomEvent("logout", handleLogout)
    }, [handleLogout])

    const contextValue: AuthContextValue = useMemo(() => ({
        user: user,
        login: (name: string) => handleLogin(name),
        logout: () => handleLogout()
    }), [handleLogin, handleLogout, user])

    if (isPending) {
        return "User connecting..."
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}