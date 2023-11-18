import { isDef } from "@/technical/isDef";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";

type CacheContextValue = {
    getFriends: () => void,
    friends: User[]
}

const CacheContext = createContext<AuthContextValue>(Object.create(null))

export const useCache = () => useContext(CacheContext);

export const CacheProvider = ({ children }: { children: ReactNode }) => {\
    const {userId} = useAuth()
    const [friends, setFriends] = useState();

    const contextValue: CacheContextValue = useMemo(() => ({
        getFriends: () => isDef(userId) ? axios.get ... : null,
        friends: friends
    }), [userId])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
