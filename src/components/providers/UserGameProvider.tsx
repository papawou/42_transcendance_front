import { emit, on, socket } from "@/services/socketio";
import axiosInstance from "@/services/AxiosInstance";
import { UserGame } from "@/shared/shared";
import { WS_FAIL, WsGame, WsGameOut } from "@/shared/ws-game";
import Paths from "@/technical/Paths";
import { isDef } from "@/technical/isDef";
import { useSnackbar } from "notistack";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserGameClient = UserGame & { status: "SEARCHING" | "INGAME" | "PASSIVE" }

type UserGameContextValue = UserGameClient | undefined

const UserGameContext = createContext<UserGameContextValue>(Object.create(null))

export const useUserGame = () => useContext(UserGameContext);

export const UserGameProvider = ({ children }: { children: ReactNode }) => {
    const [userGame, setUserGame] = useState<UserGame>();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const handleUpdateUser = useCallback((user: WsGameOut<WsGame.metaGetUser>) => {
        if (user === WS_FAIL) {
            console.warn("handleUpdateUser - inconsistent")
            setUserGame(undefined)
            return;
        }
        setUserGame(user);
    }, [])

    useEffect(() => {
        on(WsGame.metaGetUser, handleUpdateUser)
        emit(WsGame.metaGetUser, undefined);
        return () => {
            socket.off(WsGame.metaGetUser, handleUpdateUser)
        }
    }, [handleUpdateUser])

    const value: UserGameContextValue = useMemo(() => {
        if (!isDef(userGame)) {
            return undefined
        }
        return {
            ...userGame,
            status: isDef(userGame.gameId) ? "INGAME" : userGame.search ? "SEARCHING" : "PASSIVE"
        }
    }, [userGame])

    const handleDuelInvite = useCallback((data: WsGameOut<WsGame.duelInvite>) => {
        enqueueSnackbar(`Invitation received ${data.senderId}`, {
            variant: "info",
            autoHideDuration: 60000,
            action: (snackbarId) => (<>
                <button onClick={() => axiosInstance.post("/games/duel/accept", { senderId: data.senderId })}>
                    Accepter
                </button>
                <button onClick={() => closeSnackbar(snackbarId)}>
                    Ignorer
                </button>
            </>)
        })
    }, [closeSnackbar, enqueueSnackbar])

    const handleDuelStart = useCallback((data: WsGameOut<WsGame.duelStart>) => {
        enqueueSnackbar(`Duel started ${data}`, { variant: "success" })
        navigate(Paths.Pong)
    }, [enqueueSnackbar, navigate])

    useEffect(() => {
        on(WsGame.duelInvite, handleDuelInvite)
        on(WsGame.duelStart, handleDuelStart)
        return () => {
            socket.off(WsGame.duelInvite, handleDuelInvite)
            socket.off(WsGame.duelStart, handleDuelStart)
        }
    }, [handleDuelInvite, handleDuelStart])

    return (
        <UserGameContext.Provider value={value}>
            {children}
        </UserGameContext.Provider>
    )
}