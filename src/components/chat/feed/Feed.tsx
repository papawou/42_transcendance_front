import { PrivateMsgsDto, RoomDto } from '../chat.api'
import { SendMsgBar } from './SendMsgsBar'
import { socket } from "@/services/socketio"
import { ChatMessages } from './ChatMessages'
import { PrivateMessages } from './PrivateMessages'
import { ChatOptions } from './ChatOptions'
import { ReactNode, useEffect, useState } from 'react'

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
      <div style={{ padding: '16px' }}>
        <div>{children}</div>
      </div>
      )}
    </div>
  );
}

enum ChannelType {
none = 0,
privateMessage = 1,
publicChannel = 2
}

interface FeedProps {
    rooms: RoomDto[]
    privateMsgs: PrivateMsgsDto[]
    tabIndex: number
    channelType: ChannelType
}

export const Feed = ({
    rooms, 
    privateMsgs,
    tabIndex,
    channelType

}: FeedProps) => {

  const [message, setMessage] = useState<string>('');
  const [send, setSend] = useState<boolean>(false);

 useEffect(() => {  
    if (send) {
      if (message !== '' && channelType === ChannelType.publicChannel) {
        const currRoom = rooms.at(tabIndex);
        if (currRoom) {
          socket.emit('roomMessage', {roomName: currRoom.roomName, message: message})
        }
      }
      if (message !== '' && channelType === ChannelType.privateMessage) {
        const msgs = privateMsgs.at(tabIndex);
        if (msgs) {
          socket.emit('newPrivateMessage', {userId: msgs.userDto.id, message: message})
        }
      }
      setSend(false);
      setMessage('');
    }
    // eslint-disable-next-line
  }, [send]);

  return (
    <div>
      <div style={{height: '800px'}}>
        {channelType === ChannelType.publicChannel && rooms.map((room: RoomDto, index: number) => {
          return (
            <TabPanel value={tabIndex} index={index} key={index} >                       
                                          
              <div style={{ height: '750px', maxWidth: '200px', overflow: "hidden", overflowY: "auto"}}>

                <ChatOptions room={room}/>
                <ChatMessages room={room}/>

              </div>
                  
            </TabPanel>
          );
        })}
        {channelType === ChannelType.privateMessage && privateMsgs.map((msgs: PrivateMsgsDto, index: number) => {
          return (  
            <TabPanel value={tabIndex} index={index} key={index} >                       
                                            
              <div style={{ height: '700px', maxWidth: '200px', overflow: "hidden", overflowY: "auto"}}>

                <PrivateMessages pms={msgs}/>

              </div>
                    
            </TabPanel>
          );
        })}
      </div>
      { channelType !== ChannelType.none &&
        <SendMsgBar 
          setSend={setSend}
          setMessage={setMessage}
          message={message}
        />
      }
    </div>  
  )
}