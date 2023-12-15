import { jwtDecode } from "jwt-decode"
import { isDef } from "./isDef"
import { UserJWTPayload } from "@/shared/shared"


export type UserJWT = {
    id: number,
    name: string
}

export const itemName = "access_token"

export const addAccessToken = (token: string) => {
    localStorage.setItem(itemName, token)
}

export const getAccessToken = () => {
    return localStorage.getItem(itemName)
}

export const removeAccessToken = () => {
    localStorage.removeItem(itemName)
}

export const getMetaToken = (): UserJWT | null => {
    const token = getAccessToken();
    if (!isDef(token)) {
        return null;
    }
    const decoded = jwtDecode<UserJWTPayload>(token);
    if (!isDef(decoded)) { //!isDef(decoded.exp)
        removeAccessToken();
        return null;
    }
    // const isExpired = (decoded.exp * 1000) < new Date().getTime();
    // if (isExpired) {
    //     removeAccessToken()
    //     return null;
    // }

    return { id: decoded.sub, name: decoded.name }
}