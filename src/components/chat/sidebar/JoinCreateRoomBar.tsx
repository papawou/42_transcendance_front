import { CreateRoomDialog } from "./CreateRoomDialog"
import { JoinRoomDialog } from "./JoinRoomDialog"
import { AllRoomsTabs } from "./AllRoomsTabs"
import { ChatAPI } from "../chat.api"
import { socket } from "@/services/socketio"
import { useEffect, useState } from "react"
  
export const JoinCreateRoomBar = () => {

    const [allRooms, setAllRooms] = useState<string[]>([]);
    const [roomToJoin, setRoomToJoin] = useState<string>('');

    useEffect(() => {  
        const fetchRoomNames = async() => {
            const resp: {rooms: string[]} = await ChatAPI.getAllPublicRooms();
            setAllRooms(resp.rooms);
        }
        fetchRoomNames();
        const refreshTimer = setInterval(() => {
            fetchRoomNames();
        }, 5000);
        return () => clearInterval(refreshTimer);
    }, []);

    useEffect(() => {
        socket.on('roomCreated', ({roomName}) => {
            setAllRooms((allRooms) => [...allRooms, roomName])
        });
        return () => {
          socket.off('roomCreated');
        };
      }, []);

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
    <AllRoomsTabs
        rooms={allRooms}
        setRoomToJoin={setRoomToJoin}
    />
    <CreateRoomDialog
        open={openCreateRoom}
        setOpen={setOpenCreateRoom}
    />

    <JoinRoomDialog
        open={openJoinRoom}
        setOpen={setOpenJoinRoom}
        roomToJoin={roomToJoin}
    />
    </>
    )
}