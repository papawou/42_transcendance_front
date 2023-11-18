import { Dialog, DialogTitle } from "@mui/material"
import { UserDto } from "../chat.api"
import { socket } from "@/providers/socketio"

interface PMUserDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    user: UserDto
}

export const PMUserDialog = ({
    open,
    setOpen,
    user,
}: PMUserDialogProps) => {
    
    const pmCurrentUser = () => {
       socket.emit('sendPM', {userId: user.id});
       setOpen(false);
    }

    return (
        <Dialog open={open}>
        <DialogTitle>PM User</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    Are you sure you want to PM {user.name} ?
                </div>
                <div>
                    <button onClick={pmCurrentUser}>PM</button>
                    <button onClick={() => {setOpen(false)}}>Cancel</button>
                </div>
            </div>
        </Dialog>
    )
}