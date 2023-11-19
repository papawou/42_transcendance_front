import { createContext } from "react"
import { UserDto } from "./chat.api"


export const UserContext = createContext<UserDto | null>(null);
export const SetUserContext = createContext<unknown>(null);