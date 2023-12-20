import { useUsersServiceUserControllerGetMe } from "@/services/openapi/queries";
import { UserExpandedDTO } from "@/services/openapi/requests";
import { isDef } from "@/technical/isDef";
import { useSnackbar } from "notistack";
import { ReactNode, createContext, useContext, useEffect, useMemo } from "react";

type MeContextValue = UserExpandedDTO & {
    refetch: () => void
}

const MeContext = createContext<MeContextValue>(Object.create(null))

export const useMe = () => useContext(MeContext);

export const MeProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, refetch } = useUsersServiceUserControllerGetMe()
    const snackbar = useSnackbar()

    useEffect(() => {
        const poll = setInterval(() => refetch().catch(() => snackbar.enqueueSnackbar("Echec de la récupération du profil", { variant: "warning" })), 1000)
        return () => clearInterval(poll);
    }, [refetch, snackbar])

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

    if (!isDef(contextValue.id)) {
        return "LOADING ME..."
    }

    return (
        <MeContext.Provider value={contextValue}>
            {children}
        </MeContext.Provider>
    )
}