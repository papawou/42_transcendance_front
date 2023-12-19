import axiosInstance from "@/services/AxiosInstance"
import { useCallback, useState } from "react"

export function TfaAccess() {
    const [tfaCodeActivate, setTfaCodeActivate] = useState<string | undefined>("")

    const handleCodeActivateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTfaCodeActivate(e.target.value.trim())
    }, [])

    const handleCodeActivate = useCallback(() => {
        axiosInstance.post("2fa/activate", { otp: tfaCodeActivate }).then((res) => console.log(res))
    }, [tfaCodeActivate])

    return (
        <div>
            <input placeholder='code ici' onChange={handleCodeActivateChange} value={tfaCodeActivate} />
            <button onClick={handleCodeActivate}>ENVOYER</button>
        </div>
    )
}