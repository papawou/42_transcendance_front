
import { useMe } from "../providers/MeProvider"
import { socket } from "@/services/socketio"
import axiosInstance from "@/services/AxiosInstance"
import AddFriendButton from "../UserButtons/AddFriendButton"
import { useAuth } from "../providers/AuthProvider"
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react"
import { useUsersServiceUserControllerCancelFriendRequest } from "@/services/openapi/queries"
import { DuelDialog } from "../chat/bottombar/DuelDialog"
import { UserDTO } from "@/services/openapi/requests"


export function SocialButtons({ user }: { user: UserDTO }) {
    const auth = useAuth()
    const { mutateAsync: removeFriendRequest } = useUsersServiceUserControllerCancelFriendRequest();
    const { friends, blocked, pending, pendingOf, refetch } = useMe()
    const [openDuel, setOpenDuel] = useState(false)

    const { id: userId } = user;

    useEffect(() => {
        socket.on('friendRequestResponse', () => {
            refetch();
        });

        return () => {
            socket.off('friendRequestResponse');
        };
    }, [refetch]);

    const buttons = useMemo(() => {
        const tmp: { key: string, value: ReactNode }[] = []

        const emitAddFriend = (friendId: number) => {
            socket.emit('acceptFriendRequest', { friendId: friendId });
        }

        const emitRefuseRequest = (friendId: number) => {
            socket.emit('refuseFriendRequest', { friendId: friendId });
        }

        const handleUnblock = () => {
            axiosInstance.post(`users/unblock-user/${userId}`)
        }
        const handleEmit = () => {
            socket.emit('sendFriendRequest', { friendId: userId })
        }
        const handleDeleteEmit = () => {
            socket.emit('deleteFriend', { friendId: userId });
        }
        const handleBlockEmit = () => {
            socket.emit('blockFriend', { friendId: userId });
        }
        const handlePM = () => {
            socket.emit('sendPM', { userId: userId });
        }

        if (auth.user?.id === userId) {
            return tmp
        }


        if (friends?.some(p => p.id === userId)) {
            tmp.push({ key: "removefriend", value: <AddFriendButton width={10} image='deletefriend.png' onClick={() => handleDeleteEmit()} /> })
        }
        else {
            if (pending?.some(p => p.id === userId)) {
                tmp.push({ key: "removependingrequest", value: <AddFriendButton width={10} image='refuse.png' onClick={() => removeFriendRequest({ requestBody: { userId: userId } })} /> })
            }
            else if (pendingOf?.some(p => p.id === userId)) {
                tmp.push({
                    key: "pendingrequest", value: <>
                        <AddFriendButton width={10} image='valider.png' onClick={() => emitAddFriend(userId)} />
                        <AddFriendButton width={10} image='refuse.png' onClick={() => emitRefuseRequest(userId)} />
                    </>
                })
            }
            else if (!blocked?.some(p => p.id === userId)) {
                tmp.push({ key: "addfriend", value: <AddFriendButton width={10} image='addfriend.png' onClick={() => handleEmit()} /> })
            }
        }
        if (blocked?.some(p => p.id === userId)) {
            tmp.push({ key: "unblockuser", value: <AddFriendButton width={10} image='unblockuser.png' onClick={() => handleUnblock()} /> })
        }
        else {
            tmp.push({
                key: "passive", value: <>
                    <AddFriendButton width={10} image='privateMessage.png' onClick={() => { handlePM() }} />
                    <AddFriendButton width={10} image='blockfriend.png' onClick={() => handleBlockEmit()} />
                </>
            })
        }
        return tmp
    }, [auth.user?.id, blocked, friends, pending, pendingOf, removeFriendRequest, userId])

    return (
        <div style={{ display: "flex", gap: 16 }}>
            {
                buttons.map(b => <Fragment key={b.key}>
                    {b.value}
                </Fragment>)
            }
            {
                user.id !== auth.user?.id &&
                <>
                    <AddFriendButton width={10} image='swords.jpg' onClick={() => setOpenDuel(true)} />
                    <DuelDialog
                        open={openDuel}
                        setOpen={(isOpen) => setOpenDuel(isOpen)}
                        user={user}
                    />
                </>
            }
        </div >
    )
}