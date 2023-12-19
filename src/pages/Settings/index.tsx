import ChangeAvatar from "@/pages/Settings/ChangeAvatar";
import axiosInstance from "@/services/AxiosInstance";
import { useState } from "react";
import { Tfa } from "./Tfa";

const Settings = () => {
	const [input, setInput] = useState('');

	const handleValidation = () => {
		axiosInstance.post(`/users/change-name/${input.trim()}`);
	};

	return (
		<div style={{ textAlign: 'center' }}>
			<div>
				<h2 style={{ textAlign: 'center' }}> Changer de nom</h2>
				<input
					type='text'
					value={input}
					placeholder='nouveau nom'
					onChange={(e) => setInput(e.target.value)}
					maxLength={10}
				/>
				<button onClick={handleValidation}>Valider</button>
				<ChangeAvatar />
			</div>
			<div style={{ border: "1px solid red" }}>
				<h2 style={{ textAlign: 'center' }}>2FA</h2>
				<div>
					<Tfa />
				</div>
			</div>
		</div>
	);
};

export default Settings;
