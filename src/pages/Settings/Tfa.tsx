import axiosInstance from "@/services/AxiosInstance";
import { useMe } from '@/components/providers/MeProvider';
import { isDef } from "@/technical/isDef";
import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";
import "./Tfa.css"

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
        if (!isDef(tfaCodeActivate) || tfaCodeActivate.length !== 6) {
            snackbar.enqueueSnackbar("OTP code should contain 6 digits! Try again!", { variant: "warning" });
            return;
        }
        axiosInstance.post("auth/tfa/activate", { userId: id, otp: tfaCodeActivate }).then(() => { refetch(); snackbar.enqueueSnackbar("2FA code has been validated successfully!", { variant: "success" }); 
    })
    .catch(() => snackbar.enqueueSnackbar("OTP code is invalid! Try again!", { variant: "error" }));
    }, [refetch, snackbar, tfaCodeActivate])

    return (
        <div className="popupContainer">
            {
                !isDef(qrCodeImage) ? (
                    <button onClick={() => askQrCodeImage()}>GENERATE QR</button>
                ) : (
                    <div className="coolSquarePopup">
                        <div className="QR">
                            <img src={qrCodeImage} alt="QR Code" />
                        </div>
                        <input placeholder='Enter OTP here' onChange={handleCodeActivateChange} value={tfaCodeActivate} />
                        <button onClick={handleCodeActivate}>ENABLE 2FA</button>
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
            snackbar.enqueueSnackbar("2FA code is invalid! Try again!", { variant: "error" })
        })
    }, [refetch, snackbar])

    return (
        <div>
            <button onClick={handleClick}>DISABLE 2FA</button>
        </div>
    )
}

export function Tfa() {
    const me = useMe()
    return me.tfaValid ? <DisableTfa /> : <EnableTfa />
}