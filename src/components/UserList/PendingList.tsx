import "./style.css"
import Avatar from '../Avatar';
import AddFriendButton from '../UserButtons/AddFriendButton';
import { useUsersServiceUserControllerAddFriend, useUsersServiceUserControllerGetPending, useUsersServiceUserControllerRefuseFriendRequest } from '@/services/openapi/queries';

const PendingList = () => {
    const { data: users, isLoading } = useUsersServiceUserControllerGetPending();
    const { mutateAsync: postAddFriend } = useUsersServiceUserControllerAddFriend();
    const { mutateAsync: postRefuseFriendRequest } = useUsersServiceUserControllerRefuseFriendRequest()

    if (isLoading) {
        return "loading"
    }

    return (
        <div style={{ paddingLeft: '10px' }}>
            <div className='pending'>
                {users.map((user) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} key={user.id}>
                        <Avatar src='jaubarea.png' width={20} />
                        {user.name}
                        <AddFriendButton width={10} image='valider.png' onClick={() => postAddFriend({ friendId: user.id })} />
                        <AddFriendButton width={10} image='refuse.png' onClick={() => postRefuseFriendRequest({ friendId: user.id })} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingList;