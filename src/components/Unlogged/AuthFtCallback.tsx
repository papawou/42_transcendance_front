import axiosInstance from "@/services/AxiosInstance";
import { isDef } from "@/technical/isDef";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import TwoFactorAuth from '@/TwoFactorAuth/TwoFactorAuth'; 

export function AuthFtCallback() {
    const auth = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [show2FA, setShow2FA] = useState(false);
    const [loading, setLoading] = useState(true);

    const code = useMemo(() => {
        return searchParams.get("code");
    }, [searchParams]);

    useEffect(() => {
        if (!isDef(code)) {
            navigate("/");
            return;
        }

        axiosInstance
            .post(`/auth/ft/callback`, { code: code })
            .then(res => {
                if (!isDef(res.data.access_token)) {
                    navigate("/", { replace: true });
                } else {
                    axiosInstance.get(`${import.meta.env.VITE_API_URL}/2fa/isenable`, { withCredentials: true })
                        .then(res => {
                            if (res.data.enabled) {
                                setShow2FA(true);
                            } else {
                                auth.login(res.data.access_token);
                            }
                            setLoading(false);
                        })
                        .catch(() => {
                            setLoading(false);
                            navigate("/", { replace: true });
                        });
                }
            })
            .catch(() => {
                setLoading(false);
                navigate("/", { replace: true });
            });
    }, [auth, code, navigate]);

    const handle2FASubmit = (input: string) => {
        axiosInstance.post('/auth/verify-2fa', { code: input })
            .then((res) => {
                auth.login(res.data.access_token);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.error("Invalid 2FA code. Please try again.");
                } else {
                    console.error("Error during 2FA verification:", error.message);
                }
            });
    };

    return (
        <>
            {loading && <div>Loading...</div>}
            {!loading && show2FA && <TwoFactorAuth onSubmit={handle2FASubmit} />}
        </>
    );
}
