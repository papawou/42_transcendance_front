import { Feed } from "./feed/Feed"
import { socket } from "@/providers/socketio"
import { ChatNotif } from "./ChatNotif"
import { ChatAPI, PrivateMsgsDto, RoomDto, UserDto } from "./chat.api"
import { RoomTabs } from "./sidebar/RoomTabs"
import { DiscussionTabs } from "./sidebar/DiscussionTabs"
import { JoinCreateRoomBar } from "./sidebar/JoinCreateRoomBar"
import { RoomUsersTabs } from "./bottombar/RoomUsersTabs"
import { useEffect, useState } from "react"

enum ChannelType {
  none = 0,
  privateMessage = 1,
  publicChannel = 2,
}

export const Chat = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [rooms, setRooms] = useState<RoomDto[]>([]);
  const [privateMsgs, setPrivateMsgs] = useState<PrivateMsgsDto[]>([]);
  const [channelType, setChannelType] = useState<ChannelType>(ChannelType.none);

  useEffect(() => {
    const fetchMsgs = async () => {
      const chans: { rooms: RoomDto[] } = await ChatAPI.getRoomsFromUser();
      setRooms(chans.rooms);
      const pms: { privateMsgs: PrivateMsgsDto[] } = await ChatAPI.getPMsFromUser();
      setPrivateMsgs(pms.privateMsgs);
    };
    fetchMsgs();
  }, []);

  useEffect(() => {
    socket.on("newPrivateMsgUser", ({ userDto: newUser }) => {
      if (!privateMsgs.find(({ userDto }) => userDto.id === newUser.id)) {
        setPrivateMsgs((privateMsgs) => [...privateMsgs, { userDto: newUser, messages: [] }]);
      }
    });
    return () => {
      socket.off("newPrivateMsgUser");
    };
  }, [privateMsgs]);

  useEffect(() => {
    socket.on("receivePrivateMsg", ({ userId, messageDto }) => {
      const addPM: PrivateMsgsDto[] = privateMsgs.map((pm) => {
        if (pm.userDto.id === userId) {
          pm.messages.push(messageDto);
        }
        return pm;
      });
      setPrivateMsgs(addPM);
    });
    return () => {
      socket.off("receivePrivateMsg");
    };
  }, [privateMsgs]);

  useEffect(() => {
    socket.on("newRoomMessage", ({ roomName, messageDto }) => {
      const addRoomMsg: RoomDto[] = rooms.map((room) => {
        if (room.roomName === roomName) {
          room.messages.push(messageDto);
        }
        return room;
      });
      setRooms(addRoomMsg);
    });
    return () => {
      socket.off("newRoomMessage");
    };
  }, [rooms]);

  useEffect(() => {
    socket.on("addRoom", ({ room }) => {
      setRooms((rooms) => [...rooms, room]);
    });
    return () => {
      socket.off("addRoom");
    };
  }, []);

  useEffect(() => {
    socket.on("roomChanged", ({ newRoom }: { newRoom: RoomDto }) => {
      const updateRooms: RoomDto[] = rooms.map((room) => {
        if (room.roomName === newRoom.roomName) {
          return newRoom;
        }
        return room;
      });
      setRooms(updateRooms);
    });
    return () => {
      socket.off("roomChanged");
    };
  }, [rooms]);

  useEffect(() => {
    socket.on("deleteRoom", ({ roomName }) => {
      const roomIndex: number = rooms.findIndex((room) => room.roomName === roomName);
      if (roomIndex === -1) {
        return;
      } else if (tabIndex === roomIndex) {
        setChannelType(ChannelType.none);
      } else if (tabIndex < roomIndex) {
        setTabIndex(tabIndex - 1);
      }
      setRooms(rooms.filter((room) => room.roomName !== roomName));
    });
    return () => {
      socket.off("deleteRoom");
    };
  }, [rooms, tabIndex]);

  const handleChangeDiscussion = (newValue: number) => {
    setTabIndex(newValue);
    setChannelType(ChannelType.privateMessage);
  };

  const handleChangeChannel = (newValue: number) => {
    setTabIndex(newValue);
    setChannelType(ChannelType.publicChannel);
  };

  return (
    <div style={{display: 'flex', width: '300px'}}>

      {/* ------------ FEED ------------ */}
      <div style={{ width: '200px' }}>
        <Feed
          rooms={rooms}
          privateMsgs={privateMsgs}
          tabIndex={tabIndex}
          channelType={channelType}
        />
      </div>

      {/* ------------ LEFT BAR ------------ */}
      <div style={{ width: '100px' }}>
        <JoinCreateRoomBar />

        <RoomTabs
          value={channelType === ChannelType.publicChannel ? tabIndex : false}
          rooms={rooms}
          handleChangeChannel={handleChangeChannel}
        />

        <DiscussionTabs
          value={channelType === ChannelType.privateMessage ? tabIndex : false}
          rooms={privateMsgs}
          handleChangeChannel={handleChangeDiscussion}
        />
        {/* ------------ BOTTOM BAR ------------ */}
        <RoomUsersTabs
          users={
            channelType === ChannelType.publicChannel
              ? rooms.at(tabIndex)?.users || null
              : channelType === ChannelType.privateMessage
                ? [privateMsgs.at(tabIndex)?.userDto as UserDto] || null
                : null
          }
          room={channelType === ChannelType.publicChannel ? rooms.at(tabIndex) || null : null}
        />
      </div>
      <ChatNotif />
    </div>
  );
};