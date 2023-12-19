import { Dialog, DialogTitle } from "@mui/material"
import { socket } from "@/services/socketio"
import { UserDto, RoomDto } from "../chat.api"

interface AdminUserDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    user: UserDto
    room: RoomDto
}

export const AdminUserDialog = ({
    open,
    setOpen,
    user,
    room
}: AdminUserDialogProps) => {
    
    const addAdminCurrentUser = () => {
       socket.emit('setAdmin', {roomName: room.roomName, userId: user.id});
       setOpen(false);
    }
    const removeAdminCurrentUser = () => {
        socket.emit('unsetAdmin', {roomName: room.roomName, userId: user.id});
        setOpen(false);
    }

    return (
        <Dialog open={open}>
        <DialogTitle>Admin User</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    Are you sure you want to {room.admins.includes(user.id) ? 'REMOVE' : 'ADD'} {user.name} as Admin ?
                </div>
                <div>
                    <button onClick={room.admins.includes(user.id) ? removeAdminCurrentUser : addAdminCurrentUser}>
                        {room.admins.includes(user.id) ? 'removeAdmin' : 'addAdmin'}
                    </button>
                    <button onClick={() => {setOpen(false)}}>Cancel</button>
                </div>
            </div>
        </Dialog>
    )
}