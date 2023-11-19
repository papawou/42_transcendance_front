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

    const resp = await fetch(
      `http://localhost:3000/chat/userRooms`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    return resp.ok ? resp.json() : {rooms : []};
  }

  public static async getPMsFromUser(): Promise<{ privateMsgs: PrivateMsgsDto[] }> {

    const resp = await fetch(
      `http://localhost:3000/chat/userPMs`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    return resp.ok ? resp.json() : {privateMsgs : []};
  }

  public static async getAllRoomNames(): Promise<{ rooms: string[] }> {

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
}