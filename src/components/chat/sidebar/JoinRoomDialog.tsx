import { Dialog, DialogTitle } from "@mui/material"
import { socket } from "@/services/socketio"
import { ChangeEvent, useState, useEffect } from "react"
//import "./JoinRoomDialog.css"

interface JoinRoomDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  roomToJoin: string
}

export const JoinRoomDialog = ({
  open,
  setOpen,
  roomToJoin
}: JoinRoomDialogProps) => {

  const [pwd, setPwd] = useState<string>('');
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (roomToJoin !== null)
      setRoomName(roomToJoin);
    else
      setRoomName("");
  }, [roomToJoin]);

  const joinRoom = () => {
    socket.emit('joinRoom', { roomName: roomName, password: pwd });
    setRoomName('');
    setPwd('');
    setOpen(false);
  }
  
  const closeAndReset = () => {
    setRoomName('');
    setPwd('');
    setOpen(false);
  }

  const handlePwdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPwd(event.target.value);
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Join Room</DialogTitle>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (optional)"
          value={pwd}
          onChange={handlePwdChange}
        />
        <div>
          <button onClick={joinRoom}>Join</button>  
          <button onClick={closeAndReset}>Cancel</button>
        </div>
      </div>
    </Dialog>
  );
}