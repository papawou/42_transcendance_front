import { Dialog, DialogTitle } from "@mui/material"
import { socket } from "@/providers/socketio"
import { ChangeEvent, useState } from "react"

interface CreateRoomDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const CreateRoomDialog = ({
    open,
    setOpen
}: CreateRoomDialogProps) => {

    const [roomName, setRoomName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [errorPwd, setErrorPwd] = useState<string>('');
    const [privacyPublic, setPrivacyPublic] = useState<boolean>(true);

    const handlePwdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
    }

    const handleRoomChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRoomName(e.target.value);
    }

    const closeAndResetError = () => {
        setError('');
        setErrorPwd('');
        setRoomName('');
        setPwd('');
        setPrivacyPublic(true);
        setOpen(false);
    }

    const onCreate = () => {
        if (roomName === '') {
            setError('Please enter a room name')
        }
        else if (roomName.length > 10) {
            setError('Name too long (10 char max)')
        }
        else if (pwd.length !== 0 && pwd.length < 3) {
            setErrorPwd('Password to short (3 char min)')
        }
        else if (pwd.length > 10) {
            setErrorPwd('Password to long (10 char max)')
        }
        else {
            socket.emit('createRoom', { roomName: roomName, password: pwd, privacy: privacyPublic });
            setRoomName('');
            closeAndResetError();
        }
    }

    const onPrivacy = () => {
        if (privacyPublic)
            setPrivacyPublic(false);
        else
            setPrivacyPublic(true);
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Create Room</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Room name"
                    value={roomName}
                    onChange={handleRoomChange}
                />
                <input
                    type="text"
                    placeholder="Password (optional)"
                    value={pwd}
                    onChange={handlePwdChange}
                />
                {error && <p className="error">{error}</p>}
                {errorPwd && <p className="error">{errorPwd}</p>}

                <div>
                    <button onClick={onCreate}>Create</button>
                    <button onClick={closeAndResetError}>Cancel</button>
                    <button onClick={onPrivacy}>{privacyPublic ? 'Public' : 'Private'}</button>
                </div>
            </div>
        </Dialog>
    )
}