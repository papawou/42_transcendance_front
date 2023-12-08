import { styled } from "@mui/material"
import { MessageDto, RoomDto, UserDto } from "../chat.api"
import { UserContext } from "../Context"
import { useContext, useMemo } from "react"

const CMessage = styled('div')({
    backgroundColor: 'blue',
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
    const blocked: number[] = []
    const user: UserDto | null = useContext(UserContext);

    return (
        <>
            {
                room.messages
                    .filter(message => !blocked.includes(message.userId))
                    .map((message: MessageDto, index: number) => (
                        <div key={index}>
                            <CMessage>
                                <div className="sender" style={{ fontSize: '15px' }}>
                                    <strong>{message.userName}</strong>
                                </div>
                                <div className="message" style={{ fontSize: '10px', wordWrap: 'break-word' }}>
                                    {message.message}
                                </div>
                            </CMessage>
                        </div>
                    ))
            }
        </>
    )
}