import UserList from "./UserList/UserList";
import PendingList from "./UserList/PendingList";
import { useUsersServiceUserControllerGetFriends, useUsersServiceUserControllerGetUsers } from "@/services/openapi/queries";

export const FriendsList = () => {
    const { data, isLoading } = useUsersServiceUserControllerGetFriends();

    if (isLoading) {
        return "friendslist loading"
    }
    return <UserList users={data} />
}

export const UsersList = () => {
    const { data, isLoading } = useUsersServiceUserControllerGetUsers();

    if (isLoading) {
        return "userlist loading"
    }

    return <UserList users={data} />
}

export const SocialPanel = () => {

    return (
        <>
            <UsersList />
            <PendingList />
            <FriendsList />
        </>
    )
}