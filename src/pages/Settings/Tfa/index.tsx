import axiosInstance from "@/services/AxiosInstance";
import { useMe } from '@/components/providers/MeProvider';
import { isDef } from "@/technical/isDef";
import { useCallback, useState } from "react";



function EnableTfa() {
    const [qrCodeImage, setQrCodeImage] = useState<string | undefined>(undefined);
    const [tfaCodeActivate, setTfaCodeActivate] = useState<string | undefined>("")

    const askQrCodeImage = useCallback(() => {
        axiosInstance.post("2fa/enable").then(res => setQrCodeImage(res.data));
    }, [])

    const handleCodeActivateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTfaCodeActivate(e.target.value.trim())
    }, [])

    const handleCodeActivate = useCallback(() => {
        axiosInstance.post("2fa/activate", { otp: tfaCodeActivate }).then((res) => console.log(res))
    }, [tfaCodeActivate])

    return (
        <div>
            {
                !isDef(qrCodeImage) ?
                    <button onClick={() => askQrCodeImage()}>ENABLE 2FA</button>
                    : (
                        <div className="QRmodal">
                            <div className="QR">
                                <img src={qrCodeImage} alt="QR Code" />
                            </div>
                            <input placeholder='code ici' onChange={handleCodeActivateChange} value={tfaCodeActivate} />
                            <button onClick={handleCodeActivate}>ENVOYER</button>
                        </div>
                    )
            }
        </div>
    )
}

function DisableTfa() {
    return (
        <div>
            <button onClick={() => axiosInstance.post("2fa/disable")}>DISABLE 2FA</button>
        </div>
    )
}

export function Tfa() {
    const me = useMe()
    return me.tfaValid ? <DisableTfa /> : <EnableTfa />
}