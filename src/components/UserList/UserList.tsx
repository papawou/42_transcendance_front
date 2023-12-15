import { useMemo, useState } from 'react';
import Avatar from '@/components/Avatar';
import AddFriendButton from '../UserButtons/AddFriendButton';
import axiosInstance from '@/services/AxiosInstance';
import { socket } from '@/providers/socketio';
import UserProfile from '../UserProfile/UserProfile';
import { PMUserDialog } from '../chat/bottombar/PMUserDialog';
import { UserDTO } from '@/services/openapi/requests';

import "./style.css"

const User = ({ user }: { user: UserDTO }) => {
	const [openProfileDialog, setOpenProfileDialog] = useState(false);
	const [openPM, setOpenPM] = useState<boolean>(false);

	const handleClickProfile = () => {
		setOpenProfileDialog(true);
	};
	const handleCloseProfileDialog = () => {
		setOpenProfileDialog(false);
	};
	const handleUnblock = () => {
		axiosInstance.post(`users/unblock-user/${user.id}`)
	}
	const handleEmit = () => {
		socket.emit('sendFriendRequest', { friendId: user.id })
	}
	const handleDeleteEmit = () => {
		socket.emit('deleteFriend', { friendId: user.id });
	}
	const handleBlockEmit = () => {
		socket.emit('blockFriend', { friendId: user.id });
	}

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
			<Avatar src={user.pic} width={20} /> {user.name}
			<AddFriendButton width={10} image='addfriend.png' onClick={() => handleEmit()} />
			<AddFriendButton width={10} image='deletefriend.png' onClick={() => handleDeleteEmit()} />
			<AddFriendButton width={10} image='blockfriend.png' onClick={() => handleBlockEmit()} />
			<AddFriendButton width={10} image='unblockuser.png' onClick={() => handleUnblock()} />
			<AddFriendButton width={10} image='viewprofile.png' onClick={() => handleClickProfile()} />
			<AddFriendButton width={10} image='privateMessage.png' onClick={() => { setOpenPM(true) }} />
			<UserProfile
				open={openProfileDialog}
				onClose={() => handleCloseProfileDialog()}
				userId={user.id}
			/>
			<PMUserDialog
				open={openPM}
				setOpen={setOpenPM}
				userId={user.id}
				userName={user.name}
			/>
		</div>
	)
}

interface Props {
	users: UserDTO[];
}

const UserList = ({ users }: Props) => {

	const [searchInput, setSearchInput] = useState("");

	const filteredUsers = useMemo(() => {
		return users.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase()))
	}, [searchInput, users])

	return (
		<div style={{ paddingLeft: '10px' }}>
			<div className='window'>
				{
					filteredUsers.map((user) => <User key={user.id} user={user} />)
				}
			</div>
			<input
				type='text'
				placeholder='chercher'
				className='inputText'
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)} />
		</div>
	);
};

export default UserList;