import { useEffect, useState } from 'react'
import { RoomDto, UserDto } from '../chat.api'
import { UserButtons } from './UserButtons'
import { useAuth } from '@/components/providers/AuthProvider'
import { isDef } from '@/technical/isDef'

interface RoomUsersTabsProps {
  users: UserDto[] | null
  room: RoomDto | null
}

export const RoomUsersTabs = ({
  users,
  room
}: RoomUsersTabsProps) => {

  const [roomUsers, setRoomUsers] = useState<UserDto[]>([]);
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
  const { user } = useAuth();


  useEffect(() => {
    setRoomUsers(users ? users : [])
    setCurrentUser(null);
  }, [users]);

  const handleChangeUser = (selectedUser: UserDto) => {
    if (currentUser && currentUser.id === selectedUser.id)
      setCurrentUser(null);
    else
      setCurrentUser(selectedUser);
  }

  if (!isDef(users) || !isDef(room)) {
    return null;
  }

  return (
    <div>
      <div>
        <div style={{ padding: '8px 16px' }}>
          <strong>Users</strong>
        </div>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
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
                <span style={{
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: displayedUser.id === user?.id ? 'bold' : 'normal',
                  }}>
                  {room.admins.includes(displayedUser.id) ? '@' + displayedUser.name : displayedUser.name}</span>
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