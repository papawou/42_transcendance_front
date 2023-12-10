import { Button, Dialog, DialogContent, DialogTitle, } from '@mui/material';
import Avatar from '../Avatar';
import { useUsersServiceUserControllerGetUser } from '@/services/openapi/queries';


interface Props {
	open: boolean;
	onClose: () => void;
	userId: number;
}

const UserProfile = ({ open, onClose, userId }: Props) => {
	const { data: user, isLoading } = useUsersServiceUserControllerGetUser({ id: userId }, undefined, { enabled: open })

	return (
		<Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
			{
				(isLoading || !open) ? <></> :
					<>
						<DialogTitle sx={{ backgroundColor: 'greenyellow', color: 'black' }}>
							<Avatar src={user.pic} width={50} />
							{`Profil de ${user.name}`}
						</DialogTitle>
						<DialogContent sx={{ backgroundColor: 'greenyellow', color: 'black' }}>
							{/* <p>Wins : {user.wins} Loses : {user.loses} Rank : {user.rank}</p> */}
							<br></br>
							<div>
								{
									/* {
										user.matchHistory.map((match, index) =>
											<div key={index}>{match.player1Name} : {match.player1Score}  VS  {match.player2Score} : {match.player2Name}</div>
										)
									} */
								}
							</div>
							<Button variant="outlined" color="secondary" onClick={onClose} sx={{ color: 'black' }} style={{ borderColor: 'black' }}>
								Fermer
							</Button>
						</DialogContent>
					</>
			}
		</Dialog >
	);
};

export default UserProfile;