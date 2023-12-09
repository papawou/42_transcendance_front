import { styled } from "@mui/material"
import { MessageDto, RoomDto, UserDto } from "../chat.api"
import { UserContext } from "../Context"
import { useContext, useMemo } from "react"

const CMessage = styled('div')({
    backgroundColor: 'green',
    color: 'white',
    borderRadius: '10px',
    padding: "5px 10px",
    margin: '5px 20px 5px 5px',
});

interface ChatMessagesProps {
    room: RoomDto
}

export const ChatMessages = ({
    room
}: ChatMessagesProps) => {
    
    const user: UserDto | null = useContext(UserContext);

    return (
        <>
            {room.messages.map((message: MessageDto, index: number) => {
                return (
                    <div key={index}>
                        {
                            !user?.blocked?.find(({ id }) => message.userId === id) ?

                                <CMessage>
                                    <div className="sender" style={{ fontSize: '15px' }}>
                                        <strong>{message.userName}</strong>
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
        </>
    )
}