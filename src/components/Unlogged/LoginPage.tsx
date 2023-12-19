import { useCallback } from "react";

const API_FT_OAUTH2_URL = `${import.meta.env.VITE_API_FT_URL}/oauth/authorize?client_id=${import.meta.env.VITE_API_FT_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_API_FT_CALLBACK_URL)}&response_type=code`;


export const LoginPage = () => {
    const handleClick = useCallback(() => {
        window.location.href = API_FT_OAUTH2_URL;
    }, [])

    return (
        <button onClick={() => handleClick()}>
            LOGIN API 42
        </button>
    )
}   