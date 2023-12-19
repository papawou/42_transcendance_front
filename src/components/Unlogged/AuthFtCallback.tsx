import axiosInstance from "@/services/AxiosInstance";
import { isDef } from "@/technical/isDef";
import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Paths from "@/technical/Paths";

export function AuthFtCallback() {
    const { login } = useAuth()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const code = useMemo(() => {
        return searchParams.get("code")
    }, [searchParams])

    useEffect(() => {
        if (!isDef(code)) {
            navigate("/")
            return
        }
        axiosInstance
            .post(`/auth/ft/callback`, { code: code })
            .then(res => {
                if (!isDef(res.data?.access_token)) {
                    navigate(Paths.Tfa(res.data.userId), { replace: true })
                }
                else {
                    login(res.data.access_token)
                }
            })
    }, [code, login])

    return (
        <>
            LOADING...
        </>
    )
}