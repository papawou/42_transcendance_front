import { getAccessToken } from "@/technical/AccessTokenManager";
import { isDef } from "@/technical/isDef";
import { io, Socket } from "socket.io-client";

export const socket: Socket = io(import.meta.env.VITE_API_URL, {
    query: {
        token: isDef(getAccessToken()) ? `Bearer ${getAccessToken()}` : undefined
    }
});