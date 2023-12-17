import { Dialog, DialogTitle } from "@mui/material"
import { socket } from "@/providers/socketio"
import { useState } from "react"

interface ChangePwdDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    roomName: string
}

export const ChangePwdDialog = ({
    open,
    setOpen,
    roomName

}: ChangePwdDialogProps) => {

    const [pwd, setPwd] = useState<string>('');
    const [errorPwd, setErrorPwd] = useState<string>('');

    const changePwd = () => {
        if (pwd.length !== 0 && pwd.length < 3) {
            setErrorPwd('Password to short (3 char min)')
        }
        else if (pwd.length > 10) {
            setErrorPwd('Password to long (10 char max)')
        }
        else {
            setOpen(false);
            setErrorPwd('');
            setPwd('');
            socket.emit('changePassword', {roomName: roomName, password: pwd});
        }
    }

    const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value);
    }

    return (
        <Dialog open={open}>
        <DialogTitle>Change Pwd</DialogTitle>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    Please enter the new password for {roomName}
                </div>
                <input
                    type="password"
                    placeholder="Password (optional)"
                    value={pwd}
                    onChange={handlePwdChange}
                />
                {errorPwd && <p className="error">{errorPwd}</p>}

                <div>
                    <button onClick={changePwd}>Change</button>
                    <button onClick={() => { setOpen(false)}}>Cancel</button>
                </div>
            </div>
        </Dialog>
    )
}