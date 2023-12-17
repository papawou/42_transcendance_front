
import { useMe } from "../providers/MeProvider"
import { socket } from "@/providers/socketio"
import axiosInstance from "@/services/AxiosInstance"
import AddFriendButton from "../UserButtons/AddFriendButton"


export function SocialButtons({ userId }: { userId: number }) {
    const { friends, blocked } = useMe()

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
    return (
        <div style={{ display: "flex", gap: 16 }}>
            {
                friends?.some(p => p.id === userId) ?
                    <AddFriendButton width={10} image='deletefriend.png' onClick={() => handleDeleteEmit()} />
                    : <AddFriendButton width={10} image='addfriend.png' onClick={() => handleEmit()} />
            }
            {
                blocked?.some(p => p.id === userId) ?
                    <AddFriendButton width={10} image='unblockuser.png' onClick={() => handleUnblock()} />
                    : <>
                        <AddFriendButton width={10} image='privateMessage.png' onClick={() => { handlePM() }} />
                        <AddFriendButton width={10} image='blockfriend.png' onClick={() => handleBlockEmit()} />
                    </>
            }
        </div>
    )
}