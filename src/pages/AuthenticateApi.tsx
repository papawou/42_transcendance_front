import { isDef } from "@/technical/isDef";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function AuthenticateApi() {
    const { code } = useParams<{ code?: string }>();

    useEffect(() => {
        if (!isDef(code)) {
            return;
        }
        //kenneth: axios call to backend with code
    }, [code])

    return (
        <div>
            {isDef(code) ? "Loading..." : "NO CODE"}
        </div>
    )
}