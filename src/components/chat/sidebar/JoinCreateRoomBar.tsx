import { CreateRoomDialog } from "./CreateRoomDialog"
import { JoinRoomDialog } from "./JoinRoomDialog"
import { ChatAPI } from "../chat.api"
import { socket } from "@/providers/socketio"
import { useEffect, useState } from "react"


  
export const JoinCreateRoomBar = () => {

    const [allRooms, setAllRooms] = useState<string[]>([]);

    useEffect(() => {  
        const fetchRoomNames = async() => {
            const resp: {rooms: string[]} = await ChatAPI.getAllRoomNames();
            setAllRooms(resp.rooms);
        }

        fetchRoomNames();
    }, []);

    useEffect(() => {
        socket.on('roomCreated', ({roomName}) => {
            setAllRooms((allRooms) => [...allRooms, roomName])
        });
        return () => {
          socket.off('roomCreated');
        };
      }, []);

      useEffect(() => {
        socket.on('deleteRoom', ({roomName}) => {
          setAllRooms(allRooms.filter(room => room !== roomName));
        });
        return () => {
          socket.off('deleteRoom');
        };
      }, [allRooms]);

    const [openJoinRoom, setOpenJoinRoom] = useState<boolean>(false);
    const [openCreateRoom, setOpenCreateRoom] = useState<boolean>(false);

    const joinClick = ()=> {
        setOpenJoinRoom(true);
    }

    const createClick = () => {
        setOpenCreateRoom(true);
    }

    return (
    <>    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={joinClick}>Join</button>
        <button onClick={createClick}>Create</button>
    </div>

    <CreateRoomDialog
        open={openCreateRoom}
        setOpen={setOpenCreateRoom}
    />

    <JoinRoomDialog
        open={openJoinRoom}
        setOpen={setOpenJoinRoom}
    />
    </>
    )
}