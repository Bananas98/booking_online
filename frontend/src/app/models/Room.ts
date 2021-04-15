
export class Room {
  roomId: number;
  roomName: string;
  price: number;
  capacity: number;
  status: boolean;

  static fromHttp(room: Room) {
    const newRoom = new Room();
    newRoom.roomId = room.roomId;
    newRoom.roomName = room.roomName;
    newRoom.price = room.price;
    newRoom.capacity = room.capacity;
    newRoom.status = room.status;
    return newRoom;
  }
}
