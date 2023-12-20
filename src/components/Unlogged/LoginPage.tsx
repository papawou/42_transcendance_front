import { useCallback } from "react";
import "./LoginPage.css"
import Logo42 from "/src/42_Logo.png";

const API_FT_OAUTH2_URL = `${import.meta.env.VITE_API_FT_URL}/oauth/authorize?client_id=${import.meta.env.VITE_API_FT_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_API_FT_CALLBACK_URL)}&response_type=code`;


export const LoginPage = () => {
    const handleClick = useCallback(() => {
        window.location.href = API_FT_OAUTH2_URL;
    }, [])

    return (
        <div className="container">
             <div className="ball"></div>
                <h1 className="title">Couz Transcendence</h1>
                <button className="login-button" onClick={handleClick}>
                    LOGIN API <img src={Logo42} alt="Logo" className="logo-in-button" />
                </button>
                </div>
    )
}   