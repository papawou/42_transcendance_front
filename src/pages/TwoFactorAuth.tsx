import { useState, ChangeEvent } from "react";
import axiosInstance from "@/services/AxiosInstance";

export function TwoFactorAuth() {
  const [code, setCode] = useState("");

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    axiosInstance
      .post("/auth/2fa/validate", { code })
      .then((res) => {
        console.log("2FA verified:", res.data);
      })
      .catch((err) => {
        console.error("2FA verification failed:", err);
      });
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      <input type="text" value={code} onChange={handleCodeChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}