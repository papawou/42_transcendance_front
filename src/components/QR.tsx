import React, { useEffect, useState } from 'react';
import axiosInstance from "@/services/AxiosInstance";

let fetchQR: any;

const QR: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [QRisEnabled, setQRisEnabled] = useState(false);
  const [source, setSource] = useState("");
  const [QRvalue, setQRvalue] = useState("");
  const [error, setError] = useState("");   
  const [isenabled, setIsEnabled] = useState(false);

  useEffect(() => {
    axiosInstance.post(`${import.meta.env.VITE_API_URL}/2fa/isenable`, { withCredentials: true })
      .then((res) => {
        setIsEnabled(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toggleChecked = showModal || isenabled;

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowModal(event.target.checked);
  };

  function handleToggleClick(toggleChecked: boolean) {
    if (toggleChecked === true) {
      axiosInstance.post(`${import.meta.env.VITE_API_URL}/2fa/disable`, null, { withCredentials: true });
      toggleChecked = false;
      setIsEnabled(false);
    }
  }

  const submitQR = (event: React.KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (QRvalue.length !== 6) {
      setError("Code has to be with 6 digits");
      return;
    }

    axiosInstance
      .post(`${import.meta.env.VITE_API_URL}/2fa/verified`, { secret: QRvalue }, { withCredentials: true })
      .then((res) => {
        setQRisEnabled(true);
        axiosInstance
          .get(`${import.meta.env.VITE_API_URL}/2fa/verified_first_time`, { secret: QRvalue }, { withCredentials: true })
          .then((res) => {
            setError("");
            setShowModal(false);
          })
          .catch((err) => {
            if (err.code === "ERR_BAD_REQUEST") {
              setError("Wrong Auth Code !");
            }
          });
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setError("Wrong Auth Code !");
        }
      });
  };

  useEffect(() => {
    if (QRisEnabled) {
      axiosInstance.post(`${import.meta.env.VITE_API_URL}/2fa/enable`, null, { withCredentials: true })
        .then(res => {
          fetchQR = res;
          setSource(res.data);
        });
    }
  }, [QRisEnabled]);

  return (
    <div>
      <label className="toggle-switch">
        <input
          type="checkbox"
          onClick={() => handleToggleClick(toggleChecked)}
          checked={toggleChecked}
          onChange={handleToggleChange}
        />
        <span className="slider"></span>
        <p>2FA</p>
      </label>
      {showModal && (
        <div className="QRmodal">
          <div className="QR">
          <img src={source} alt="QR Code" />
          </div>
          <form onSubmit={submitQR}>
            <input
              onChange={(e) => setQRvalue(e.target.value)}
              value={QRvalue}
              id="QRinput"
              type="text"
              placeholder="Your Code"
            />
            <br />
            <center>
              <p id="ErrorMessage">{error}</p>
            </center>
          </form>
        </div>
      )}
    </div>
  );
};

export default QR;
