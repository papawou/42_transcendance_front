import { useCallback, useEffect, useMemo, useState } from 'react';
import "./style.css"
import Avatar from '@/components/Avatar';
import AddFriendButton from '../UserButtons/AddFriendButton';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance from '@/services/AxiosInstance';
import { isDef } from '@/technical/isDef';
import { socket } from '@/providers/socketio';
import UserProfile from '../UserProfile/UserProfile';

interface User {
	name: string
	id: number
}

const User = ({ name, id }: { name: string, id: number }) => {
	const { user } = useAuth();
	const [openProfileDialog, setOpenProfileDialog] = useState(false);

	const handleClickProfile = () => {
		setOpenProfileDialog(true);
	};
	const handleCloseProfileDialog = () => {
		setOpenProfileDialog(false);
	};

	const handleClick = useCallback((route: string) => {
		if (!isDef(user)) {
			return;
		}

		const config = {
			method: 'post',
			url: `/users/${route}/${id}`,
		}

		axiosInstance(config)
			.then(response => {
				console.log(response);
			})
	}, [id, user]);

	const handleEmit = () => {
		if (!isDef(user))
			return;
		socket.emit('sendFriendRequest', { friendId: id })
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const friendRequestResponseAck = (response: any) => console.log(response);
		socket.on('friendRequestResponse', friendRequestResponseAck);

		return () => {
			socket.off('friendRequestResponse', friendRequestResponseAck);
		};
	}, []);

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
			<Avatar src='jaubarea.png' width={20} /> {name}
			<AddFriendButton width={10} image='addfriend.png' onClick={() => handleEmit()} />
			<AddFriendButton width={10} image='deletefriend.png' onClick={() => handleClick("delete-friend")} />
			<AddFriendButton width={10} image='blockfriend.png' onClick={() => handleClick("block-user")} />
			<AddFriendButton width={10} image='unblockuser.png' onClick={() => handleClick("unblock-user")} />
			<AddFriendButton width={10} image='viewprofile.png' onClick={() => handleClickProfile()} />
			<UserProfile
				open={openProfileDialog}
				onClose={handleCloseProfileDialog}
				userId={id}
				userName={name}
			/>
		</div>
	)
}

interface Props {
	users: User[];
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
					filteredUsers.map((user) => <User key={user.id} name={user.name} id={user.id} />)
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
