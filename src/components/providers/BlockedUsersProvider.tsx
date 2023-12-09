import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChatAPI } from "../chat/chat.api";


const BlockedUsersContext = createContext<number[]>([]);

export const useBlockedUser = () => useContext(BlockedUsersContext);

export const BlockedUsersProvider = ({ children }: { children: ReactNode }) => {
  const [blockedUsers, setBlockedUsers] = useState<number[]>([]);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      const resp: { blockedUsers: number[] } = await ChatAPI.getBlockedUsers();
      setBlockedUsers(resp.blockedUsers);
    }
    fetchBlockedUsers();

    const refreshTimer = setInterval(() => {
      fetchBlockedUsers();
    }, 5000);
    return () => clearInterval(refreshTimer);
  }, []);

  return (
    <BlockedUsersContext.Provider value={blockedUsers}>
      {children}
    </BlockedUsersContext.Provider>
  );
};
