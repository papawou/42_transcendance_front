import { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle} from '@mui/material';
import Avatar from '../Avatar';
import { isDef } from '@/technical/isDef';
import axiosInstance from '@/services/AxiosInstance';

interface matchHistory {
	type: string,
	player1Score: number,
	player2Score: number,
	player1Name: string,
	player2Name: string,
}

interface User {
	name: string,
	id: number,
	wins: number,
	loses: number,
	rank: number,
	matchHistory: matchHistory[]
}

const UserProfile = ({ open, onClose, userId, userName }) => {

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
			const response = await axiosInstance.get(`users/${userId}/user`)
			setUser(response.data)
		}
		if (open && userId)
			getUser();
	}, [open, userId]);

	if (isDef(user)) {
		return (
			<Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
				<DialogTitle sx={{ backgroundColor: 'greenyellow', color: 'black' }}><Avatar src='jaubarea.png' width={50} />{`Profil de ${userName}`}</DialogTitle>
				<DialogContent sx={{ backgroundColor: 'greenyellow', color: 'black' }}>
					<p>Wins : {user.wins} Loses : {user.loses} Rank : {user.rank}</p>
					<br></br>
					<div>{user.matchHistory.map((match) => (
						<div>{match.player1Name} : {match.player1Score}  VS  {match.player2Score} : {match.player2Name}</div>
					))}</div>
					<Button variant="outlined" color="secondary" onClick={onClose} sx={{ color: 'black' }} style={{borderColor: 'black'}}>
						Fermer
					</Button>
				</DialogContent>
			</Dialog >
		);
	}
	return;
};

export default UserProfile;