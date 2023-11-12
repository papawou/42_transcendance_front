import { useMemo, useState } from 'react';
import "./style.css"
import Avatar from '@/components/Avatar';
import AddFriendButton from '../UserButtons/AddFriendButton';

interface User {
	name: string
	id: number
}

interface Props {
	users: User[];
}

const User = ({ name, id }: { name: string, id: number }) => {
	return (
		<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
			<Avatar src='jaubarea.png' width={20} /> {name}
			<AddFriendButton width={10} image='addfriend.png' route='add-friend' frId={id} />
			<AddFriendButton width={10} image='deletefriend.png' route='delete-friend' frId={id} />
			<AddFriendButton width={10} image='blockfriend.png' route='block-user' frId={id} />
		</div>
	)
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
