import { useState, ChangeEvent } from "react";
import axiosInstance from "@/services/AxiosInstance";
import { useAuth } from "@/components/providers/AuthProvider";

export function EnableTwoFactor() {
  const { user } = useAuth();
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSecretKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.target.value);
  };

  const handleSubmit = () => {
    if (user && user.id) {
      axiosInstance
        .post("auth/2fa/enable", { userId: user.id, secretKey: secretKey, name: user.name, qrCodeImage: qrCodeImage })
        .then((res) => {
          console.log("2FA enabled:", res.data.message);
          if (res.data && res.data.qrCodeImage && res.data.secretKey) {
            setQrCodeImage(res.data.qrCodeImage);
            console.log("QR Code Image:", qrCodeImage);
            setSecretKey(res.data.secretKey);
          }
        })
        .catch((err) => {
          console.error("Failed to enable 2FA:", err);
        });
    }
  };

  return (
    <div>
      <h2>Enable Two-Factor Authentication</h2>
      <input
        type="text"
        value={secretKey}
        onChange={handleSecretKeyChange}
        placeholder="Enter secret key"
      />
      <button onClick={handleSubmit}>Enable 2FA</button>
      {qrCodeImage && (
        <div>
          <h3>Scan this QR Code</h3>
          <img src={qrCodeImage} alt="QR Code" />
        </div>
      )}
    </div>
  );
}