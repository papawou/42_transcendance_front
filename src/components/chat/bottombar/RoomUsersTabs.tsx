import { useContext, useEffect, useState } from 'react'
import { RoomDto, UserDto } from '../chat.api'
import { UserContext } from '../Context'
import { UserButtons } from './UserButtons'

interface RoomUsersTabsProps {
  users: UserDto[] | null
  room: RoomDto | null
}

export const RoomUsersTabs = ({
  users,
  room
}: RoomUsersTabsProps) => {

  const user: UserDto | null = useContext(UserContext);
  const [roomUsers, setRoomUsers] = useState<UserDto[]>([]);
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);


  useEffect(() => {
    setRoomUsers(users ? users : [])
  }, [user, users]);

  const handleChangeUser = (selectedUser: UserDto) => {
    if (currentUser && currentUser.id === selectedUser.id)
      setCurrentUser(null);
    else
      setCurrentUser(selectedUser);
  }

  if (!users || !room) {
    return null;
  }

  return (
    <div>
      <div>
        <div style={{ padding: '8px 16px' }}>
          <strong>Users</strong>
        </div>
        <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {roomUsers.map((displayedUser) => (
              <li
                key={displayedUser.id}
                onClick={() => handleChangeUser(displayedUser)}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  backgroundColor:
                    currentUser && currentUser.id === displayedUser.id
                      ? '#f0f0f0'
                      : 'transparent',
                }}
              >
                <span style={{ fontSize: '12px' }}>{room.admins.includes(displayedUser.id) ? '@' + displayedUser.name : displayedUser.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <UserButtons
        currentUser={currentUser}
        room={room}
      />
    </div>
  );
}