import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance from '@/services/AxiosInstance';

const UserSettings = () => {

    const [input, setInput] = useState('');
    const { user } = useAuth();

    const handleValidation = () => {

        axiosInstance.post(`/users/${user?.id}/change-name/${input}`)
            .then(response => { console.log(response); })
            .catch(error => {
                console.log(`can't change username to ${input}` + error);
            });
    };

    return (
        <div>
            changer de nom
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