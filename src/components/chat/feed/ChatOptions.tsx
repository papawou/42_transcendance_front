import { useContext, useState } from 'react'
import { RoomDto, UserDto } from '../chat.api'
import { ChangePwdDialog } from './ChangePwdDialog'
import { Dialog, DialogTitle } from "@mui/material"
import { socket } from "@/providers/socketio"
import { useAuth } from '@/components/providers/AuthProvider'

export const ChatOptions = ({room}: {room: RoomDto}) => {
    const {user} = useAuth();

    const [openLeaveRoom, setOpenLeaveRoom] = useState<boolean>(false);
    const [openPwdRoom, setOpenPwdRoom] = useState<boolean>(false);

    function leaveRoom(): void {
        setOpenLeaveRoom(false);
        socket.emit('leaveRoom', { roomName: room.roomName });
    }

    const onLeave = () => {
        setOpenLeaveRoom(true);
    }

    const onChangePwd = () => {
        setOpenPwdRoom(true);
    }

    return (
        <div>
            <div>
                <button onClick={onLeave}>Leave</button>
                <button onClick={onChangePwd}>Password</button>
            </div>
            <Dialog open={openLeaveRoom}>
            <DialogTitle>Leave room {room.roomName} ?</DialogTitle>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>
                        {user?.id === room.owner
                            ? 'The room will be destroyed because you are the owner.'
                            : 'You will no longer be in this room.'}
                    </div>
                    <div>
                        <button onClick={leaveRoom}>Accept</button>
                        <button onClick={() => { setOpenLeaveRoom(false)}}>Cancel</button>
                    </div>
                </div>
            </Dialog>
            <ChangePwdDialog
                open={openPwdRoom}
                setOpen={setOpenPwdRoom}
                roomName={room.roomName}
            />
        </div>
    )
}
