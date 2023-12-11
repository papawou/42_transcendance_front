import { useState, ChangeEvent, useEffect } from "react";
import axiosInstance from "@/services/AxiosInstance";

export function EnableTwoFactor() {
  const [code, setCode] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    axiosInstance
      .put("/auth/2fa/enable", { code })
      .then((res) => {
        console.log("2FA enabled:", res.data);
        if (res.data && res.data.qrCodeImage) {
          setQrCodeImage(res.data.qrCodeImage);
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
        </div>
      )}
    </div>
  );
}
