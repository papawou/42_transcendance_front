interface SendMsgsBarProps {
    setSend: (send: boolean) => void
    setMessage: (message: string) => void
    message: string;
}

export const SendMsgBar = ({
    setSend,
    setMessage, 
    message
}: SendMsgsBarProps) => {

    const handleMsgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: "column",
            alignItems: 'center',
        }}>
            <input
                type="text"
                placeholder="Type your message"
                value={message}
                onChange={handleMsgChange}
            />
            <button onClick={() => { setSend(true) }}>Send</button>
        </div>
    )
}