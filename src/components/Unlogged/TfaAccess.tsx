import axiosInstance from "@/services/AxiosInstance"
import { useCallback, useState } from "react"
import { useAuth } from "../providers/AuthProvider"
import { useSearchParams } from "react-router-dom"

export function TfaAccess() {
    const { login, logout } = useAuth()
    const [searchParams,] = useSearchParams()
    const [tfaCodeActivate, setTfaCodeActivate] = useState<string | undefined>("")
    const [error, setError] = useState(false)

    const handleCodeActivateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTfaCodeActivate(e.target.value.trim())
    }, [])

    const handleCodeActivate = useCallback(() => {
        setError(false);
        axiosInstance.post("auth/tfa/verify", { userId: Number(searchParams.get("userId")), otp: tfaCodeActivate })
            .then(res => login(res.data.access_token))
            .catch(() => setError(true))
    }, [login, searchParams, tfaCodeActivate])

    return (
        <div>
            {error && <p>Error OTP</p>}
            <input placeholder='code ici' onChange={handleCodeActivateChange} value={tfaCodeActivate} />
            <button onClick={handleCodeActivate}>ENVOYER</button>
            <button onClick={() => logout()}>LOGOUT</button>
        </div>
    )
}