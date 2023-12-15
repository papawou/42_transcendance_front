import UserList from "./UserList/UserList";
import PendingList from "./UserList/PendingList";
import { useUsersServiceUserControllerGetFriends, useUsersServiceUserControllerGetUsers } from "@/services/openapi/queries";
import { useEffect } from "react";
import { socket } from "@/providers/socketio";

export const FriendsList = () => {
    const { data, isLoading, refetch: refetchFriend } = useUsersServiceUserControllerGetFriends();

    useEffect(() => {
        socket.on('acceptFriendRequest', () => {
            refetchFriend();
        });
        return () => {
            socket.off('acceptFriendRequest');
        }
    }, [refetchFriend]);

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
            <FriendsList />
            <PendingList />
        </>
    )
}