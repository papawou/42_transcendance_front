import { useState } from 'react';
import "./style.css"
import Avatar from '@/components/Avatar';

interface User {
	name: string
	id: number
}

interface Props {
	users: User[];
}

const UserList = ({ users }: Props) => {

	const [searchInput, setSearchInput] = useState("");

	return (
		<div style={{ paddingLeft: '10px' }}>
			<div className='window'>
				{users
					.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase())).map((user) => (
						<div key={user.id} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
							<Avatar src='jaubarea.png' width={20} /> {user.name}
						</div>
					))}
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
