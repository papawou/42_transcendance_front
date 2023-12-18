import React, { useState } from 'react'
import axiosInstance from "@/services/AxiosInstance";
import { useNavigate } from 'react-router-dom';

const TwoFactorAuth: React.FC = () => {
  const [input, setInput] = useState("");



  const queryParams = new URLSearchParams(window.location.search);
  //const imageParam = queryParams.get("image");
  const navigate = useNavigate();


  const submitForm = () => {
    axiosInstance
      .post(`${import.meta.env.VITE_API_URL}/2fa/verified`, {secret: input}, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
            axiosInstance
            .post(`${import.meta.env.VITE_API_URL}/auth/verified`, null, {
              withCredentials: true,
            })
            .then((response) => {
              if (response.status === 200) {
                window.location.href = `${import.meta.env.VITE_API_FT_URL}/user`;
              } else {
                throw new Error("Request failed");
              }
            })
            .catch((error) => {
              // console.log()
              console.log(error);
               navigate("/");
            });
        }
      })
      .catch((error) => {
        console.log(error);

      });
  };

  return (
    <div className="mainDiv">
      <br />
      <input type="text" id="inputText" placeholder="Enter Your OTP" value={input} onChange={(e) => setInput(e.target.value)} />
      <br />{" "}
      <button
        onClick={submitForm}
        className='otp'
      >
        Submit
      </button>
    </div>
  );
};

export default TwoFactorAuth;