
import { useEffect, useState } from "react";
import UserList from "./UserList/UserList";
import axiosInstance from "@/services/AxiosInstance";
import PendingList from "./UserList/PendingList";

export const SocialPanel = () => {
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [pendings, setPendings] = useState([]);

    useEffect(() => {
        axiosInstance.get('/user').then(response => { setUsers(response.data); })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        axiosInstance.get('/friends').then(response => { setFriends(response.data); })
            .catch(error => {
                console.error("Error fetching friends data:", error);
            });
        axiosInstance.get(`/pending`).then(response => { setPendings(response.data); })
            .catch(error => {
                console.error("Error fetching friends data:", error);
            });
    }, []);

    return (
        <>
            <UserList users={users} />
            <PendingList users={pendings} />
            <UserList users={friends} />
        </>
    )
}