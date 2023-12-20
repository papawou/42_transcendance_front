import { styled } from "@mui/material"
import { MessageDto, PrivateMsgsDto } from "../chat.api"
import { useMe } from "@/components/providers/MeProvider";

const PMessage = styled('div')(({ isCurrentUser }: { isCurrentUser: boolean }) => ({
    backgroundColor: isCurrentUser ? 'rgb(124, 187, 18)' : 'green',
    color: 'white',
    borderRadius: '10px',
    padding: "5px 10px",
    margin: '5px 20px 5px 5px',
}));

interface privateMessagesProps {
    pms: PrivateMsgsDto
}

export const PrivateMessages = ({
    pms
}: privateMessagesProps) => {
    const user = useMe()

    return (
        <div style={{ width: '165px' }}>
            {pms.messages.map((message: MessageDto, index: number) => {
                const isCurrentUserMessage = user?.id === message.userId;
                return (
                    <div key={index}>
                        {
                            !user.blocked.some(p => p.id === message.userId) ?

                                <PMessage isCurrentUser={isCurrentUserMessage}>
                                    <div className="sender" style={{ fontSize: '15px' }}>
                                        <strong>{isCurrentUserMessage ? 'Me' : message.userName}</strong>
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
        </div>
    )
}