import { Dialog, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"
import { socket } from "@/providers/socketio"

export const ChatNotif = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');


  useEffect(() => {
    socket.on('chatNotif', ({ notif }) => {
      setMessage(notif);
      setOpen(true);
    });
    return () => {
      socket.off('chatNotif');
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Chat notification</DialogTitle>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {message}
        <div>
          <button onClick={handleClose}>ok</button>
        </div>
      </div>
    </Dialog>
  )
}