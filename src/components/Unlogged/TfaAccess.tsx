import axiosInstance from "@/services/AxiosInstance"
import { useCallback, useState } from "react"
import { useAuth } from "../providers/AuthProvider"
import { useSearchParams } from "react-router-dom"
import { useSnackbar } from 'notistack';

export function TfaAccess() {
    const { login } = useAuth()
    const [searchParams,] = useSearchParams()
    const [tfaCodeActivate, setTfaCodeActivate] = useState<string>("")
    const [error, setError] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    const handleCodeActivateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTfaCodeActivate(e.target.value.trim())
    }, [])

    const handleCodeActivate = useCallback(() => {
        setError(false);
        if (tfaCodeActivate.length !== 6) {
            setError(true);
            enqueueSnackbar('OTP code should contain 6 digits! Try again!', { variant: 'warning' });
            return;
        }
        axiosInstance.post("auth/tfa/verify", { userId: Number(searchParams.get("userId")), otp: tfaCodeActivate })
            .then(res => login(res.data.access_token))
            .catch(() => {
                setError(true);
                enqueueSnackbar('Error: Wrong OTP code! Try again!', { variant: 'error' });
            });
    }, [login, searchParams, tfaCodeActivate, enqueueSnackbar])

    return (
        <div>
            <input placeholder='Enter OTP here' onChange={handleCodeActivateChange} value={tfaCodeActivate} />
            <button onClick={handleCodeActivate}>VALIDATE</button>
        </div>
    )
}
