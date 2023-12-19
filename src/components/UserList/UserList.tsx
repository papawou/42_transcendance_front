import { useState } from 'react';
import Avatar from '@/components/Avatar';
import { UserDTO } from '@/services/openapi/requests';

import AddFriendButton from '../UserButtons/AddFriendButton';
import UserProfile from '../UserProfile';

import "./style.css"

const User = ({ user }: { user: UserDTO }) => {
	const [openProfileDialog, setOpenProfileDialog] = useState(false);

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
			<Avatar src={user.pic} width={25} /> {user.name}
			<UserProfile
				open={openProfileDialog}
				onClose={() => setOpenProfileDialog(false)}
				userId={user.id}
			/>
			<AddFriendButton width={10} image='viewprofile.png' onClick={() => setOpenProfileDialog(true)} />
		</div>
	)
}

interface Props {
	users: UserDTO[];
}

const UserList = ({ users }: Props) => {
	return (
		<div style={{ paddingLeft: '10px' }}>
			<div className='window'>
				{
					users.map((user) => <User key={user.id} user={user} />)
				}
			</div>
		</div>
	);
};

export default UserList;