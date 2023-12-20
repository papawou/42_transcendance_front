import { Dialog, DialogTitle } from "@mui/material"
import { UserDto } from '../chat.api'
import axiosInstance from "@/services/AxiosInstance"
import { DuelInviteDTO } from "@/services/openapi/requests"
import { useCallback } from "react"

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

    const duelCurrentUser = useCallback((type: DuelInviteDTO.type) => {
        axiosInstance.post("games/duel/invite", {
            targetId: user.id,
            type: type
        })
        setOpen(false);
    }, [setOpen, user.id])

    return (
        <Dialog open={open}>
            <DialogTitle>Duel User</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    Are you sure you want to Duel {user.name} ?
                </div>
                <div>
                    <button onClick={() => duelCurrentUser(DuelInviteDTO.type.CASUAL)}>CASUAL</button>
                    <button onClick={() => duelCurrentUser(DuelInviteDTO.type.TROLL)}>TROLL</button>
                </div>
                <div>
                    <button onClick={() => setOpen(false)}>Cancel</button>
                </div>
            </div>
        </Dialog>
    )
}