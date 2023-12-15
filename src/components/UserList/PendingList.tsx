import "./style.css"
import Avatar from '../Avatar';
import AddFriendButton from '../UserButtons/AddFriendButton';
import { useUsersServiceUserControllerGetPending } from '@/services/openapi/queries';
import { useEffect } from "react";
import { socket } from "@/providers/socketio";
import { Skeleton } from "@mui/material";

const PendingList = () => {
    const { data: users, isLoading, refetch: refetchUsers } = useUsersServiceUserControllerGetPending();

    const emitAddFriend = (friendId: number) => {
        socket.emit('acceptFriendRequest', { friendId: friendId });
    }

    const emitRefuseRequest = (friendId: number) => {
        socket.emit('refuseFriendRequest', { friendId: friendId });
    }

    useEffect(() => {
        socket.on('friendRequestResponse', () => {
            refetchUsers();
        });

        return () => {
            socket.off('friendRequestResponse');
        };
    }, [refetchUsers]);

    return (
        <div style={{ paddingLeft: '10px' }}>
            {
                isLoading ? <Skeleton variant="rectangular" /> :
                    (
                        <div className='pending'>
                            {users.map(user => (
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} key={user.id}>
                                    <Avatar src={user.pic} width={20} />
                                    {user.name}
                                    <AddFriendButton width={10} image='valider.png' onClick={() => emitAddFriend(user.id)} />
                                    <AddFriendButton width={10} image='refuse.png' onClick={() => emitRefuseRequest(user.id)} />
                                </div>
                            ))}
                        </div>
                    )
            }
        </div>
    );
};

export default PendingList;