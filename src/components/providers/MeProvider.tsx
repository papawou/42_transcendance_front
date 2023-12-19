
import { useUsersServiceUserControllerGetMe } from "@/services/openapi/queries";
import { UserExpandedDTO } from "@/services/openapi/requests";
import { ReactNode, createContext, useContext, useEffect, useMemo } from "react";

type MeContextValue = UserExpandedDTO & {
    refetch: () => void
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
            ...user,
            refetch: () => refetch()
        })
    }, [
        JSON.stringify(user?.friends.sort((a, b) => a.id - b.id)),
        JSON.stringify(user?.blocked.sort((a, b) => a.id - b.id)),
        JSON.stringify(user?.pending.sort((a, b) => a.id - b.id)),
        JSON.stringify(user?.pendingOf.sort((a, b) => a.id - b.id)),
        user?.tfaValid,
        refetch
    ])

    return (
        <MeContext.Provider value={contextValue}>
            {children}
        </MeContext.Provider>
    )
}