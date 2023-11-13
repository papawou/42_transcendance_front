import React from 'react';
import "./style.css"
import Avatar from '../Avatar';
import AddFriendButton from '../UserButtons/AddFriendButton';

interface User {
    name: string;
    id: number;
}

interface Props {
    users: User[];
}

const PendingList = ({ users }: Props) => {



    return (
        <div style={{ paddingLeft: '10px' }}>
            <div className='pending'>
                {users.map((user) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} key={user.id}>
                        <Avatar src='jaubarea.png' width={20} />
                        {user.name}
                        <AddFriendButton width={10} image='valider.png' route='add-friend' frId={user.id} />
                        <AddFriendButton width={10} image='refuse.png' route='refuse-friend-request' frId={user.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingList;