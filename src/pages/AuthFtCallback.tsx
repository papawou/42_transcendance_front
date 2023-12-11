import axiosInstance from "@/services/AxiosInstance";
import { isDef } from "@/technical/isDef";
import { useEffect } from "react";
import { Home } from "./Home";
import { useState } from "react";
import { EnableTwoFactor } from "@/components/TwoFactorAuth/Enable2fa";

export function AuthFtCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!isDef(code)) return;
    
    const [data, setData] = useState(undefined);
    const [is2FARequired, setIs2FARequired] = useState(false);
    useEffect (() => {
        axiosInstance
            .post(`/auth/ft/callback`, { code })
            .then(res => {
                setData(res.data);
                console.log({
                    where: "AuthFtCallback/useEffect.then",
                    resData: res.data,
                });
                if (res.data.is2FARequired) {
                    setIs2FARequired(true);
                  }
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
          {isDef(code) ? (
            isDef(data) ? (
              <Home data={data} />
            ) : is2FARequired ? (
              <EnableTwoFactor />
            ) : (
              "Loading..."
            )
          ) : (
            "NO CODE"
          )}
        </div>
      );
}