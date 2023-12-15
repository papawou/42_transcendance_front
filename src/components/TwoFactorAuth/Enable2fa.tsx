import { useState, ChangeEvent, useEffect } from "react";
import axiosInstance from "@/services/AxiosInstance";

export function EnableTwoFactor() {
  const [code, setCode] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    axiosInstance
      .post("auth/2fa/enable", { code, secretKey })
      .then((res) => {
        console.log("2FA enabled:", res.data.message);
        if (res.data && res.data.qrCodeImage && res.data.secretKey) {
          setQrCodeImage(res.data.qrCodeImage);
          setSecretKey(res.data.secretKey);
        }
      })
      .catch((err) => {
        console.error("Failed to enable 2FA:", err);
      });
  };

  return (
    <div>
      <h2>Enable Two-Factor Authentication</h2>
      <input type="text" value={code} onChange={handleCodeChange} />
      <button onClick={handleSubmit}>Enable 2FA</button>
      {qrCodeImage && (
        <div>
          <h3>Scan this QR Code</h3>
          <img src={qrCodeImage} alt="QR Code" />
          <p>Secret Key: {secretKey}</p>
        </div>
      )}
    </div>
  );
}
