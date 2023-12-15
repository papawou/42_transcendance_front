import axiosInstance from "@/services/AxiosInstance";

export interface UserDto {
  id: number,
  name: string,
  blocked?: UserDto[],
}

export interface MessageDto {
  userId : number,
  userName : string,
  message : string,
}

export interface PrivateMsgsDto {
  userDto : UserDto,
  messages : Array<MessageDto>,
}

export interface RoomDto {
  roomName : string,
  owner : number,
  admins : Array<number>,
  users : Array<UserDto>,
  messages : Array<MessageDto>,
}

export class ChatAPI {

  public static async getRoomsFromUser(): Promise<{ rooms: RoomDto[] }> {
    try {
      const response = await axiosInstance.get('/chat/userRooms');
  
      if (response.status === 200) {
        return response.data;
      } else {
        return { rooms: [] };
      }
    } catch (error) {
      console.error('An error occurred while fetching User Rooms:', error);
      return { rooms: [] };
    }
  }

  public static async getPMsFromUser(): Promise<{ privateMsgs: PrivateMsgsDto[] }> {
    try {
      const response = await axiosInstance.get('/chat/userPMs');
  
      if (response.status === 200) {
        return response.data;
      } else {
        return { privateMsgs: [] };
      }
    } catch (error) {
      console.error('An error occurred while fetching User PMs:', error);
      return { privateMsgs: [] };
    }
  }

  public static async getAllPublicRooms(): Promise<{ rooms: string[] }> {
    try {
      const response = await axiosInstance.get('/chat/roomNames');
  
      if (response.status === 200) {
        return response.data;
      } else {
        return { rooms: [] };
      }
    } catch (error) {
      console.error('An error occurred while fetching room names:', error);
      return { rooms: [] };
    }
  }

  public static async getBlockedUsers(): Promise<{ blockedUsers: number[] }> {
    try {
      const response = await axiosInstance.get('chat/blockedUsers');

      if (response.status === 200) {
        return response.data;
      } else {
        return { blockedUsers: [] };
      }
    } catch (error) {
      console.error('An error occurred while fetching blocked users:', error);
      return { blockedUsers: [] };
    }
  }
}