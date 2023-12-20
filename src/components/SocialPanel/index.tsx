import { useEffect, useMemo, useState } from "react";
import { useMe } from "../providers/MeProvider";
import axiosInstance from "@/services/AxiosInstance";
import { UserDTO } from "@/services/openapi/requests";
import { UserAvatar } from "../UserAvatar";

import "./style.css"

export const UsersList = ({ title, users }: { title: string, users: UserDTO[] }) => {
    if (users.length === 0) {
        return <></>
    }
    return (
        <>
            <div>{title}</div>
            {
                users.map(user => <UserAvatar key={user.id} user={user} />)
            }
        </>
    )
}

export const SocialPanel = () => {
    const [users, setUsers] = useState<UserDTO[]>()
    const me = useMe()

    useEffect(() => {
        axiosInstance.get("/users").then(res => setUsers(res.data)).catch(() => { })
    }, [])


    const { friends, pending, pendingOf, blocked, others } = useMemo(() => {
        return ({
            friends: me.friends,
            pending: me.pending,
            pendingOf: me.pendingOf,
            blocked: me.blocked,
            others: users?.filter(p =>
                !([...me.friends, ...me.pending, ...me.pendingOf, ...me.blocked].some(d => p.id === d.id)) && !(p.id === me.id)
            ) ?? []
        })
    }, [me.blocked, me.friends, me.id, me.pending, me.pendingOf, users])

    return (
        <div className='window'>
            <UsersList title="Amis" users={friends} />
            <UsersList title="Requêtes envoyées" users={pending} />
            <UsersList title="Requêtes reçues" users={pendingOf} />
            <UsersList title="Utilisateurs" users={others} />
            <UsersList title="Bloqués" users={blocked} />
        </div>
    )
}