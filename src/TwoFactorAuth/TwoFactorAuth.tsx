import React, { useState } from "react";
import axiosInstance from "@/services/AxiosInstance";
import { useNavigate } from "react-router-dom";

interface TwoFactorAuthProps {
    onSubmit: (input: string) => void;
  }

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const imageParam = queryParams.get("image");
  const navigate = useNavigate();


  const submitForm = () => {
    axiosInstance
      .post(`${import.meta.env.VITE_API_URL}/2fa/verified`, {secret: input}, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
            onSubmit(input);
            axiosInstance
            .post(`${import.meta.env.VITE_API_URL}/2fa/verified`, null, {
              withCredentials: true,
            })
            .then((response) => {
              if (response.status === 200) {
                // navigate("/home");
              } else {
                throw new Error("Request failed");
              }
            })
            .catch((error) => {
              console.log(error);
              navigate("/");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/");

      });
  };

  return (
    <div className="container">
      <div
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
      </div>
      <br />
      <input type="text" id="inputText" placeholder="Enter your text" value={input} onChange={(e) => setInput(e.target.value)} />
      <br />{" "}
      <button
        onClick={submitForm}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default TwoFactorAuth;