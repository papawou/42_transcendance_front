import { io, Socket } from "socket.io-client";

export const socket: Socket = io("localhost:3000");