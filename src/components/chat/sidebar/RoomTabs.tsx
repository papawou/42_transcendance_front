import { RoomDto } from "../chat.api"

interface RoomTabsProps {
    value: number | false
    rooms: RoomDto[]
    handleChangeChannel: (newValue: number) => void
}

export const RoomTabs = ({
    value,
    rooms,
    handleChangeChannel

}: RoomTabsProps) => {

  return (
    <div style={{ maxWidth: '100px'}}>
      <div style={{ padding: '8px 16px'}}>
        <strong>Rooms</strong>
      </div>
      <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rooms.map((channel, index) => (
            <li
              key={index}
              onClick={() => handleChangeChannel(index)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: value === index ? '#f0f0f0' : 'transparent',
              }}
            >
              <span style={{ fontSize: '12px' }}>{channel.roomName}</span>
            </li>
          ))}
        </ul>
      </div>  
    </div>
  );
}