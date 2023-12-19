import { Dialog, DialogTitle } from "@mui/material"
import { socket } from "@/services/socketio"

interface PMUserDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    userId: number
    userName: string
}

export const PMUserDialog = ({
    open,
    setOpen,
    userId,
    userName,
}: PMUserDialogProps) => {
    
    const pmCurrentUser = () => {
       socket.emit('sendPM', {userId: userId});
       setOpen(false);
    }

    return (
        <Dialog open={open}>
        <DialogTitle>PM User</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    Are you sure you want to PM {userName} ?
                </div>
                <div>
                    <button onClick={pmCurrentUser}>PM</button>
                    <button onClick={() => {setOpen(false)}}>Cancel</button>
                </div>
            </div>
        </Dialog>
    )
}