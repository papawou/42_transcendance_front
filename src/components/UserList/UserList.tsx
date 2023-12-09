import { useCallback, useMemo, useState } from 'react';
import "./style.css"
import Avatar from '@/components/Avatar';
import AddFriendButton from '../UserButtons/AddFriendButton';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance from '@/services/AxiosInstance';
import { isDef } from '@/technical/isDef';
import { socket } from '@/providers/socketio';
import UserProfile from '../UserProfile/UserProfile';
import { PMUserDialog } from '../chat/bottombar/PMUserDialog';

interface User {
	name: string
	id: number
	pic: string
}

const User = ({ name, id, pic }: { name: string, id: number, pic: string }) => {
	const { user } = useAuth();
	const [openProfileDialog, setOpenProfileDialog] = useState(false);
	const [openPM, setOpenPM] = useState<boolean>(false);

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

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
			<Avatar src={pic} width={20} /> {name}
			<AddFriendButton width={10} image='addfriend.png' onClick={() => handleEmit()} />
			<AddFriendButton width={10} image='deletefriend.png' onClick={() => handleClick("delete-friend")} />
			<AddFriendButton width={10} image='blockfriend.png' onClick={() => handleClick("block-user")} />
			<AddFriendButton width={10} image='unblockuser.png' onClick={() => handleClick("unblock-user")} />
			<AddFriendButton width={10} image='viewprofile.png' onClick={() => handleClickProfile()} />
			<AddFriendButton width={10} image='privateMessage.png' onClick={() => {setOpenPM(true)}} />
			<UserProfile
				open={openProfileDialog}
				onClose={handleCloseProfileDialog}
				userId={id}
				userName={name}
			/>
			 <PMUserDialog
                open={openPM}
                setOpen={setOpenPM}
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
					filteredUsers.map((user) => <User key={user.id} name={user.name} id={user.id} pic={user.pic} />)
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