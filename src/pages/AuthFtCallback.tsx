import axiosInstance from "@/services/AxiosInstance";
import { isDef } from "@/technical/isDef";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Home } from "./Home";
import { useState } from "react";

export function AuthFtCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!isDef(code)) return;
    
    const [data, setData] = useState(undefined);
    useEffect (() => {
        axiosInstance
            .post(`/auth/ft/callback`, { code })
            .then(res => {
                setData(res.data);
                console.log({
                    where: "AuthFtCallback/useEffect.then",
                    resData: res.data,
                });
            })
            .catch(err => {
                console.error({
                    where: "AuthFtCallback/useEffect.catch",
                    err: err,
                });
            });
    }, [code])
    // console.log({
    //     where: "END AuthFtCallback",
    //     code: code,
    //     data: data,
    // })
    return (
        <div>
            {isDef(code) ? (isDef(data) ? <Home data={data}/> : "Loading...") : "NO CODE"}
        </div>
    )
}