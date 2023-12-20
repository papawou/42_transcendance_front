import ChangeAvatar from "@/pages/Settings/ChangeAvatar";
import axiosInstance from "@/services/AxiosInstance";
import { useCallback, useState } from "react";
import { Tfa } from "./Tfa";
import { useSnackbar } from "notistack";

const Settings = () => {
	const { enqueueSnackbar } = useSnackbar()
	const [input, setInput] = useState('');

	const handleValidation = useCallback(() => {
		axiosInstance
			.post(`/users/change-name`, { username: input })
			.then(() => enqueueSnackbar("Username mis à jour", { variant: "success" }))
			.catch(() => enqueueSnackbar("Une erreur est survenue", { variant: "error" }));
	}, [enqueueSnackbar, input]);

	return (
		<div style={{ textAlign: 'center' }}>
			<div>
				<h2 style={{ textAlign: 'center' }}> Changer de nom</h2>
				<input
					type='text'
					value={input}
					placeholder='Username'
					onChange={(e) => setInput(e.target.value.trim())}
					maxLength={20}
				/>
				<button
					disabled={input.trim().length === 0}
					onClick={handleValidation}
				>
					Valider
				</button>
				<ChangeAvatar />
			</div>
			<div style={{ border: "1px solid red" }}>
				<h2 style={{ textAlign: 'center' }}>2FA</h2>
				<div>
					<Tfa />
				</div>
			</div>
		</div >
	);
};

export default Settings;
