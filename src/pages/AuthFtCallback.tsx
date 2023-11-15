import axiosInstance from "@/services/AxiosInstance";
import { isDef } from "@/technical/isDef";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function AuthFtCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    // console.log(code);

    useEffect(() => {
        if (!isDef(code)) {
            return;
        }
        //kenneth: axios call to backend with code
        axiosInstance
            .post(`/auth/ft/callback`, { code })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    }, [code])

    return (
        <div>
            {isDef(code) ? "Loading..." : "NO CODE"}
        </div>
    )
}