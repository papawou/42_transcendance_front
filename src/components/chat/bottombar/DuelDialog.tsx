import { Dialog, DialogTitle } from "@mui/material"
import { UserDto } from '../chat.api'
import axiosInstance from "@/services/AxiosInstance"

interface DuelDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    user: UserDto
}

export const DuelDialog = ({
    open,
    setOpen,
    user,
}: DuelDialogProps) => {

    const duelCurrentUser = () => {
        axiosInstance.post("games/duel/invite", {
            targetId: user.id
        })
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Duel User</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    Are you sure you want to Duel {user.name} ?
                </div>
                <div>
                    <button onClick={duelCurrentUser}>Duel</button>
                    <button onClick={() => { setOpen(false) }}>Cancel</button>
                </div>
            </div>
        </Dialog>
    )
}