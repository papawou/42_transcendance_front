import { dispatchCustomEvent, registerCustomEvent, removeCustomEvent } from "@/services/events";
import { useDefaultServiceAuthControllerLogin } from "@/services/openapi/queries";
import { UserJWT, addAccessToken, getMetaToken, removeAccessToken } from "@/technical/AccessTokenManager";

import Paths from "@/technical/Paths";
import { isDef } from "@/technical/isDef";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextValue = {
    user?: UserJWT | null
    logout: () => void
    login: (name?: string) => void
}

const AuthContext = createContext<AuthContextValue>(Object.create(null))

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserJWT | null>(getMetaToken());
    const { isPending, mutateAsync: login } = useDefaultServiceAuthControllerLogin();
    const navigate = useNavigate()

    const handleLogout = useCallback(() => {
        removeAccessToken()
        setUser(null)
        navigate(Paths.Home, { replace: true })
    }, [navigate])

    const handleLogin = useCallback(async (name?: string) => {
        try {
            if (isDef(name)) {
                const res = await login({ requestBody: { name } })
                addAccessToken(res.access_token);
            }
            const token = getMetaToken();
            if (!isDef(token)) {
                throw ("should not happend")
            }
            setUser(token)
            dispatchCustomEvent("login", undefined)
        }
        catch (e) {
            handleLogout()
        }
    }, [handleLogout, login])

    useEffect(() => {
        registerCustomEvent("logout", handleLogout);
        return () => removeCustomEvent("logout", handleLogout)
    }, [handleLogout])

    useEffect(() => {
        const token = getMetaToken();
        if (isDef(token)) {
            handleLogin();
        }
    }, [handleLogin])

    const contextValue: AuthContextValue = useMemo(() => ({
        user: user,
        login: (name: string) => handleLogin(name),
        logout: () => handleLogout()
    }), [handleLogin, handleLogout, user])

    if (isPending) {
        return <>User connecting...</>
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}