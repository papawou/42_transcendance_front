import { Dialog, DialogTitle } from "@mui/material"
import { UserDto } from "../chat.api"
import { socket } from "@/providers/socketio"

interface KickUserDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    user: UserDto
    roomName: string
}

export const KickUserDialog = ({
    open,
    setOpen,
    user,
    roomName
}: KickUserDialogProps) => {
    
    const kickCurrentUser = () => {
       socket.emit('kickUser', {roomName: roomName, userId: user.id});
       setOpen(false);
    }

    return (
        <Dialog open={open}>
        <DialogTitle>Kick User</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    Are you sure you want to KICK {user.name} ?
                </div>
                <div>
                    <button onClick={kickCurrentUser}>Kick</button>
                    <button onClick={() => {setOpen(false)}}>Cancel</button>
                </div>
            </div>
        </Dialog>
    )
}