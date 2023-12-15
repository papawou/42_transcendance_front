import { useAuth } from "@/components/providers/AuthProvider";
import axiosInstance from "@/services/AxiosInstance";
import { useEffect, useState } from "react";

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
	pic: string,
	wins: number,
	loses: number,
	rank: number,
	matchHistory: matchHistory[]
}

const profileStyles: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	textAlign: 'center',
	justifyContent: 'center',
	fontWeight: 'bold'
}

const Profile = () => {
	
	const { user } = useAuth();

	const [profile, setProfile] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
			const response = await axiosInstance.get(`users/${user?.id}/user`)
			setProfile(response.data);
		}
		if(user?.id)
			getUser();
	}, [profile, user?.id]);
	
	return (
		<div style={profileStyles}>
			Wins : {profile?.wins} Loses : {profile?.loses} Rank : {profile?.rank}
			<h2>HISTORY</h2>
			{profile?.matchHistory.map((match, index) => (
				<div key={index}>{match.player1Name} : {match.player1Score}  VS  {match.player2Score} : {match.player2Name}</div>
			))}
		</div>
	)
}

const User = () => {
	return (
		<Profile />
	);
};

export default User;
