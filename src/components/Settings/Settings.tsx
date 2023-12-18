import React, { useState } from 'react';
import axiosInstance from '@/services/AxiosInstance';
import TwoFactorAuth from '@/TwoFactorAuth/TwoFactorAuth'; 
import QR from '@/components/QR';

const UserSettings = () => {
    const [input, setInput] = useState('');
    const [show2FA, setShow2FA] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const handleValidation = () => {
        axiosInstance.post(`/users/change-name/${input.trim()}`);
    };

    const toggle2FA = () => {
        setShow2FA(!show2FA);
        setShowQR(false);
    };

    const toggleQR = () => {
        setShowQR(!showQR);
        setShow2FA(false);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ textAlign: 'center' }}> Changer de nom</h2>
            <input
                type='text'
                value={input}
                placeholder='nouveau nom'
                onChange={(e) => setInput(e.target.value)}
                maxLength={10}
            />
            <button onClick={handleValidation}>Valider</button>
            <button onClick={toggle2FA}>Toggle 2FA</button>
            <button onClick={toggleQR}>Toggle QR</button>
            {show2FA && <TwoFactorAuth />}
            {showQR && <QR />}
        </div>
    );
};

export default UserSettings;
