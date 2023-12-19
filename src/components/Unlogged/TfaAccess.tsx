import axiosInstance from "@/services/AxiosInstance"
import { useCallback, useState } from "react"
import { redirect } from "react-router-dom"

export function TfaAccess() {
    const [tfaCodeActivate, setTfaCodeActivate] = useState<string | undefined>("")
    const [error, setError] = useState(false)

    const handleCodeActivateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTfaCodeActivate(e.target.value.trim())
    }, [])

    const handleCodeActivate = useCallback(() => {
        setError(false);
        axiosInstance.post("2fa/activate", { otp: tfaCodeActivate }).then(() => redirect("/")).catch(() => setError(true))
    }, [tfaCodeActivate])

    return (
        <div>
            {error && <p>Error OTP</p>}
            <input placeholder='code ici' onChange={handleCodeActivateChange} value={tfaCodeActivate} />
            <button onClick={handleCodeActivate}>ENVOYER</button>
        </div>
    )
}