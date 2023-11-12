
import { useEffect, useState } from "react";
import UserList from "./UserList/UserList";
import axiosInstance from "@/services/AxiosInstance";

export const SocialPanel = () => {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axiosInstance.get('/user').then(response => { setUsers(response.data); })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        axiosInstance.get('/friends').then(response => { setFriends(response.data); })
            .catch(error => {
                console.error("Error fetching friends data:", error);
            });
    }, []);

    return (
        <>
            <UserList users={users} />
            <br />
            <UserList users={friends} />
        </>
    )
}