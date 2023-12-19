import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { socket } from "@/services/socketio";

export const ChatNotif = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const handleChatNotif = ({ notif }: { notif: string }) => {
      enqueueSnackbar(notif, {
        variant: "info",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        autoHideDuration: 5000,
        action: (key) => (
          <button onClick={() => closeSnackbar(key)}>OK</button>
        ),
        style: { backgroundColor: "green" },
      });
    };

    socket.on("chatNotif", handleChatNotif);

    return () => {
      socket.off("chatNotif", handleChatNotif);
    };
  }, [enqueueSnackbar]);

  return null;
};