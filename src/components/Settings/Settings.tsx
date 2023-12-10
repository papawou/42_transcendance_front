import { useState } from 'react';
import axiosInstance from '@/services/AxiosInstance';

const UserSettings = () => {

    const [input, setInput] = useState('');
    const handleValidation = () => {
        axiosInstance.post(`/users/change-name/${input.trim()}`)
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
        </div>
    );
};

export default UserSettings;

