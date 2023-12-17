
import { useUsersServiceUserControllerGetMe } from "@/services/openapi/queries";
import { UserDTO } from "@/services/openapi/requests";
import { ReactNode, createContext, useContext, useEffect, useMemo } from "react";

type MeContextValue = {
    friends?: UserDTO[]
    blocked?: UserDTO[],
    pending?: UserDTO[],
    pendingOf?: UserDTO[]
    refetch: () => void
}

const MeContext = createContext<MeContextValue>(Object.create(null))

export const useMe = () => useContext(MeContext);

export const MeProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, refetch } = useUsersServiceUserControllerGetMe()

    useEffect(() => {
        const poll = setInterval(() => {
            refetch()
        }, 1000);
        return () => clearInterval(poll);
    }, [refetch])

    const contextValue: MeContextValue = useMemo(() => {
        return ({
            friends: user?.friends,
            blocked: user?.blocked,
            pending: user?.pending,
            pendingOf: user?.pendingOf,
            refetch: () => refetch()
        })
    }, [
        JSON.stringify(user?.friends.sort((a, b) => a.id - b.id)),
        JSON.stringify(user?.blocked.sort((a, b) => a.id - b.id)),
        JSON.stringify(user?.pending.sort((a, b) => a.id - b.id)),
        JSON.stringify(user?.pendingOf.sort((a, b) => a.id - b.id)),
        refetch
    ])

    return (
        <MeContext.Provider value={contextValue}>
            {children}
        </MeContext.Provider>
    )
}