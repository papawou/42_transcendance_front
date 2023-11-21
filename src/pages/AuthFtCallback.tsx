import axiosInstance from "@/services/AxiosInstance";
import { isDef } from "@/technical/isDef";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/providers/AuthProvider";
import { addAccessToken } from "@/technical/AccessTokenManager";
import Paths from "@/technical/Paths";

export function AuthFtCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const navigate = useNavigate();
    
    const auth = useAuth();
    useEffect (() => {
        if (!isDef(code)) return;
        axiosInstance
            .post(`/auth/ft/callback`, { code }) // pourquoi tu cries ?
            .then(res => {
                console.log({
                    where: "AuthFtCallback/useEffect.then",
                    res: res,
                });
                addAccessToken(res.data.access_token); // save token in browser
                auth.login();
                navigate(Paths.Home, { replace: true });
            })
            .catch(err => {
                console.error({
                    where: "AuthFtCallback/useEffect.catch",
                    err: err,
                });
            });
    }, [auth, code, navigate])
    if (!isDef(code)) return;
    // console.log({
    //     where: "END AuthFtCallback",
    //     code: code,
    //     data: data,
    // })
    return (
        <div>
            {isDef(code) ? "Loading..." : "NO CODE, call the devs"}
        </div>
    )
}