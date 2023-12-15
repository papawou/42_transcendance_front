import { getAccessToken } from "@/technical/AccessTokenManager";
import { io, Socket } from "socket.io-client";
import { registerCustomEvent } from "../services/events";
import { WsGame, WsGameIn, WsGameOut } from "@/shared/ws-game";
import { isDef } from "@/technical/isDef";

export const socket: Socket = io(import.meta.env.VITE_API_URL, {
    auth: (cb) => cb({ token: getAccessToken() }),
    autoConnect: false
});

const onLogout = () => {
    socket.disconnect()
}
registerCustomEvent("logout", onLogout)

const onLogin = () => {
    socket.connect()
}
registerCustomEvent("login", onLogin)


export const emit = <T extends WsGame>(name: T, payload: WsGameIn<T>, cb?: (res: WsGameOut<T>) => void) => {
    if (!isDef(cb)) {
        socket.emit(name, payload)
    }
    else {
        socket.emit(name, payload, cb)
    }
}

export const on = <T extends WsGame>(name: T, cb: (res: WsGameOut<T>) => void) => {
    socket.on(name, cb)
}