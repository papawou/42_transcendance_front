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
    useEffect (() => { // normal behavior to do it twice : https://stackoverflow.com/a/73129390
        if (!isDef(code)) {
            console.log({
                where: "AuthFtCallback/useEffect@isDef(code)",
                code: code,
            });
            return;
        }
        axiosInstance
            .post(`/auth/ft/callback`, { code })
            .then(res => {
                if (!res.data) return ;
                addAccessToken(res.data.access_token); // save token in browser
                auth.login();
                navigate(Paths.Home, { replace: true });
            })
            .catch(err => {
                console.error({
                    where: "AuthFtCallback/useEffect.catch",
                    errRespData: err.response?.data,
                });
                return;
            });
    }, [auth, code, navigate])
    if (!isDef(code)) return;

    return (
        <div>
            {isDef(code) ? "Loading..." : "NO CODE, call the devs"}
        </div>
    )
}