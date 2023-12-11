import { useState } from "react";
import axiosInstance from "@/services/AxiosInstance";

export function DisableTwoFactor() {
  const [code] = useState("");

  const handleSubmit = () => {
    axiosInstance
      .post("/auth/2fa/disable", { code })
      .then((res) => {
        console.log("2FA disabled:", res.data);
      })
      .catch((err) => {
        console.error("Failed to disable 2FA:", err);
      });
  };

  return (
    <div>
      <h2>Disable Two-Factor Authentication</h2>
      <button onClick={handleSubmit}>Disable 2FA</button>
    </div>
  );
}
