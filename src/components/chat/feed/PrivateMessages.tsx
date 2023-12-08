import { styled } from "@mui/material"
import { MessageDto, PrivateMsgsDto, UserDto } from "../chat.api"
import { UserContext } from "../Context"
import { useContext } from "react"

const PMessage = styled('div')({
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '10px',
    padding: "5px 10px",
    margin: '5px 20px 5px 5px',
});

interface privateMessagesProps {
    pms: PrivateMsgsDto
}

export const PrivateMessages = ({
    pms
}: privateMessagesProps) => {

    const user: UserDto | null = useContext(UserContext);

    return (
        <>
            {pms.messages.map((message: MessageDto, index: number) => {
                return (
                    <div key={index}>
                        {
                            !user?.blocked?.find(({ id }) => message.userId === id) ?

                                <PMessage>
                                    <div className="sender" style={{ fontSize: '15px' }}>
                                        <strong>{message.userName}</strong>
                                    </div>
                                    <div className="message" style={{ fontSize: '10px', wordWrap: 'break-word' }}>
                                        {message.message}
                                    </div>
                                </PMessage>
                                :
                                null
                        }
                    </div>
                );
            })}
        </>
    )
}