import axiosInstance from "@/services/AxiosInstance";
import { useMe } from '@/components/providers/MeProvider';
import { isDef } from "@/technical/isDef";
import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";

function EnableTfa() {
    const { id, refetch } = useMe()
    const snackbar = useSnackbar()
    const [qrCodeImage, setQrCodeImage] = useState<string | undefined>(undefined);
    const [tfaCodeActivate, setTfaCodeActivate] = useState<string | undefined>("")

    const askQrCodeImage = useCallback(() => {
        axiosInstance.post("auth/tfa/enable").then(res => setQrCodeImage(res.data)).catch(() => snackbar.enqueueSnackbar("Echec de la demande 2FA", { variant: "error" }));
    }, [snackbar])

    const handleCodeActivateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTfaCodeActivate(e.target.value.trim())
    }, [])

    const handleCodeActivate = useCallback(() => {
        axiosInstance.post("auth/tfa/activate", { userId: id, otp: tfaCodeActivate }).then(() => refetch()).catch(() => snackbar.enqueueSnackbar("Code d'activation 2FA invalide", { variant: "warning" }))
    }, [refetch, snackbar, tfaCodeActivate])

    return (
        <div>
            {
                !isDef(qrCodeImage) ?
                    <button onClick={() => askQrCodeImage()}>GENERER QR 2FA</button>
                    : (
                        <div className="QRmodal">
                            <div className="QR">
                                <img src={qrCodeImage} alt="QR Code" />
                            </div>
                            <input placeholder='OTP ici' onChange={handleCodeActivateChange} value={tfaCodeActivate} />
                            <button onClick={handleCodeActivate}>ACTIVER 2FA</button>
                        </div>
                    )
            }
        </div>
    )
}

function DisableTfa() {
    const snackbar = useSnackbar()
    const { refetch } = useMe()

    const handleClick = useCallback(() => {
        axiosInstance.post("auth/tfa/disable").then(() => refetch()).catch(() => {
            snackbar.enqueueSnackbar("Code d'activation 2FA invalide", { variant: "warning" })
        })
    }, [refetch, snackbar])

    return (
        <div>
            <button onClick={handleClick}>RETIRER 2FA</button>
        </div>
    )
}

export function Tfa() {
    const me = useMe()
    return me.tfaValid ? <DisableTfa /> : <EnableTfa />
}