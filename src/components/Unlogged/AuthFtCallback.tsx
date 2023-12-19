import axiosInstance from "@/services/AxiosInstance";
import { isDef } from "@/technical/isDef";
import { useEffect, useMemo } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

export function AuthFtCallback() {
    const auth = useAuth()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const code = useMemo(() => {
        return searchParams.get("code")
    }, [searchParams])

    useEffect(() => {
        if (!isDef(code)) {
            navigate("/",)
            return
        }
        axiosInstance
            .post(`/auth/ft/callback`, { code: code })
            .then(res => {
                if (!isDef(res.data.access_token)) {
                    navigate("/", { replace: true })
                }
                auth.login(res.data.access_token)
            })
            .catch(() => {
                navigate("/", { replace: true })
            })
    }, [auth, code])

    return (
        <>
            LOADING...
        </>
    )
}