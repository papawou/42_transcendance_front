import { PrivateMsgsDto} from "../chat.api"

interface DiscussionTabsProps {
    value: number | false
    rooms: PrivateMsgsDto[]
    handleChangeChannel: (newValue: number) => void
}

export const DiscussionTabs = ({
    value,
    rooms,
    handleChangeChannel

}: DiscussionTabsProps) => {

  return (
    <div>
      <div style={{ padding: '8px 16px'}}>
        <strong>PMs</strong>
      </div>
      <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rooms.map((privateMsgs, index) => (
            <li
              key={index}
              onClick={() => handleChangeChannel(index)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: value === index ? '#f0f0f0' : 'transparent',
              }}
            >
              <span style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {privateMsgs.userDto.name}</span>
            </li>
          ))}
        </ul>
      </div>  
    </div>
  );
}