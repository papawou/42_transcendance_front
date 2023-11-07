import { Dialog, DialogTitle } from "@mui/material"
import React from "react"
import { UserDto } from "../chat.api"
import { socket } from "@/providers/socketio"

enum Sentence {
    none = -1,
    ban = 0,
    mute = 1,
}

interface BanMuteUserDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    user: UserDto
    roomName: string
    sentence: Sentence
    setSentence: (sentence: Sentence) => void
}

export const BanMuteUserDialog = ({
    open,
    setOpen,
    user,
    roomName,
    sentence,
    setSentence
}: BanMuteUserDialogProps) => {

    const [time, setTime] = React.useState<number>(-1);

    const handleSentence = () => {
        if (sentence === Sentence.ban && time !== -1) {
            socket.emit('banUser', { roomName: roomName, userId: user.id, time: time })
        }
        if (sentence === Sentence.mute && time !== -1) {
            socket.emit('muteUser', { roomName: roomName, userId: user.id, time: time })
        }
        setOpen(false);
        setSentence(Sentence.none);
        setTime(-1);
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                {sentence === Sentence.ban
                    ? "Ban User"
                    : sentence === Sentence.mute && "Mute User"}
            </DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    Are you sure you want to {sentence === Sentence.ban ? "BAN" : sentence === Sentence.mute && "MUTE"} {user.name} ?
                </div>
                <div>
                    {sentence === Sentence.ban ? "Ban" : sentence === Sentence.mute && "Mute"} Time: {time !== -1 ? time : "-"}
                </div>
                <div>
                    {sentence === Sentence.mute && (
                        <button onClick={() => { setTime(0) }}>Unmute</button>
                    )}
                    <button onClick={() => { setTime(5) }}>5min</button>
                    <button onClick={() => { setTime(15) }}>15min</button>
                    <button onClick={() => { setTime(60) }}>60min</button>
                </div>
                <button onClick={handleSentence}>Confirm</button>
                <button onClick={() => { setOpen(false) }}>Cancel</button>
            </div>
        </Dialog>
    )
}