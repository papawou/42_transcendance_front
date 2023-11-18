import { emit, on, socket } from "@/providers/socketio";
import { UserGame } from "@/shared/shared";
import { WS_FAIL, WsGame, WsGameOut } from "@/shared/ws-game";
import { isDef } from "@/technical/isDef";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type UserGameClient = UserGame & { status: "SEARCHING" | "INGAME" | "PASSIVE" }

type UserGameContextValue = UserGameClient | undefined

const UserGameContext = createContext<UserGameContextValue>(Object.create(null))

export const useUserGame = () => useContext(UserGameContext);

export const UserGameProvider = ({ children }: { children: ReactNode }) => {
    const [userGame, setUserGame] = useState<UserGame>();

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
            status: isDef(userGame.gameId) ? "INGAME" :
                userGame.search ? "SEARCHING" : "PASSIVE"
        }
    }, [userGame])

    return (
        <UserGameContext.Provider value={value}>
            {children}
        </UserGameContext.Provider>
    )
}