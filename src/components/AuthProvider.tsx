import { ReactNode, createContext, useContext, useMemo, useState } from "react";

type AuthContextValue = {
    userId?: string
    logout: () => void
    login: (newUserId: string) => void
}

const AuthContext = createContext<AuthContextValue>(Object.create(null))

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUser] = useState<string>();

    const contextValue: AuthContextValue = useMemo(() => ({
        userId: userId,
        login: (newUserId: string) => {
            setUser(newUserId)
        },
        logout: () => setUser(undefined)
    }), [userId])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}