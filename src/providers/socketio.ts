import { getAccessToken } from "@/technical/AccessTokenManager";
import { io, Socket } from "socket.io-client";

export const socket: Socket = io(import.meta.env.VITE_API_URL, {
    auth: (cb) => cb({ token: getAccessToken() })
});