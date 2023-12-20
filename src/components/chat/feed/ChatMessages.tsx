import { styled } from "@mui/material"
import { MessageDto, RoomDto } from "../chat.api"
import { useMe } from "@/components/providers/MeProvider";

const CMessage = styled('div')(({ isCurrentUser }: { isCurrentUser: boolean }) => ({
    backgroundColor: isCurrentUser ? 'rgb(124, 187, 18)' : 'green',
    color: 'white',
    borderRadius: '10px',
    padding: "5px 10px",
    margin: '5px 20px 5px 5px',
}));

interface ChatMessagesProps {
    room: RoomDto
}

export const ChatMessages = ({
    room
}: ChatMessagesProps) => {
    const user = useMe()

    return (
        <div style={{ width: '165px' }}>
            {room.messages.map((message: MessageDto, index: number) => {
                const isCurrentUserMessage = user.id === message.userId;
                return (
                    <div key={index}>
                        {
                            !user.blocked.some(p => p.id === message.userId) ?

                                <CMessage isCurrentUser={isCurrentUserMessage}>
                                    <div className="sender" style={{ fontSize: '15px' }}>
                                        <strong>{isCurrentUserMessage ? 'Me' : message.userName}</strong>
                                    </div>
                                    <div className="message" style={{ fontSize: '10px', wordWrap: 'break-word' }}>
                                        {message.message}
                                    </div>
                                </CMessage>
                                :
                                null
                        }
                    </div>
                );
            })}
        </div>
    )
}