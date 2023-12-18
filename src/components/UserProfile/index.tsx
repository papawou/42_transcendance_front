import { Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';

import { useUsersServiceUserControllerGetUser, useUsersServiceUserControllerGetUserHistory } from '@/services/openapi/queries';
import { useMemo } from 'react';
import { isDef } from '@/technical/isDef';
import dayjs from 'dayjs';
import { SocialButtons } from './SocialButtons';
import QR from '../QR';

import Avatar from '../Avatar';

interface Props {
	open: boolean;
	onClose: () => void;
	userId: number;
}

const UserProfile = ({ open, onClose, userId }: Props) => {
	const { data: user, isLoading } = useUsersServiceUserControllerGetUser({ id: userId }, undefined, { enabled: open })
	const { data: userHistory, isLoading: isLoadingHistory } = useUsersServiceUserControllerGetUserHistory({ id: userId }, undefined, { enabled: open })

	const history = useMemo(() => {
		if (isLoadingHistory || !isDef(userHistory)) {
			return []
		}

		return [
			...userHistory.wins.map(p => ({
				id: p.id,
				status: "Victoire",
				user: p.loser,
				type: p.type,
				createdAt: p.createdAt
			})),
			...userHistory.loses.map(p => ({
				id: p.id,
				status: "Défaite",
				user: p.winner,
				type: p.type,
				createdAt: p.createdAt
			}))
		]
	}, [isLoadingHistory, userHistory])

	return (
		<Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
			{
				(isLoading || isLoadingHistory || !open) ? <></> :
					<>
						<DialogTitle sx={{ backgroundColor: 'greenyellow', color: 'black' }}>
						{/* <QR /> */}
							<Avatar src={user.pic} width={50} />
							{`Profil de ${user.name}`}
							<SocialButtons userId={user.id} />
						</DialogTitle>
						<DialogContent sx={{ backgroundColor: 'greenyellow', color: 'black' }}>
							<div>Victoires: {userHistory.wins.length} Défaites: {userHistory.loses.length} / {user.elo}</div>
							<div>
								{
									history.length === 0 ? "Aucune parties jouées" :
										<Table>
											<TableBody>
												{
													history.map((p) => (
														<TableRow key={p.id}>
															<TableCell component="th" scope="row">
																{p.status}
															</TableCell>
															<TableCell align="right">{p.user.name}</TableCell>
															<TableCell>{p.type}</TableCell>
															<TableCell>{dayjs(p.createdAt).format("DD.MM.YYYY")}</TableCell>
														</TableRow>
													))
												}
											</TableBody>
										</Table>
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