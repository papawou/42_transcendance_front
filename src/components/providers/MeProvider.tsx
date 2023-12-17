
import { useUsersServiceUserControllerGetMe } from "@/services/openapi/queries";
import { UserDTO } from "@/services/openapi/requests";
import { ReactNode, createContext, useContext, useEffect, useMemo } from "react";

type MeContextValue = {
    friends?: UserDTO[]
    blocked?: UserDTO[]
}

const MeContext = createContext<MeContextValue>(Object.create(null))

export const useMe = () => useContext(MeContext);

export const MeProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, refetch } = useUsersServiceUserControllerGetMe()

    useEffect(() => {
        const poll = setInterval(() => {
            refetch()
        }, 5000);
        return () => clearInterval(poll);
    }, [refetch])

    const contextValue: MeContextValue = useMemo(() => {
        return ({
            friends: user?.friends,
            blocked: user?.blocked
        })
    }, [JSON.stringify(user?.friends.sort((a, b) => a.id - b.id)), JSON.stringify(user?.blocked.sort((a, b) => a.id - b.id))])

    return (
        <MeContext.Provider value={contextValue}>
            {children}
        </MeContext.Provider>
    )
}