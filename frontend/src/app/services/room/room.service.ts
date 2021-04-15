import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Room} from '../../models/Room';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {


  constructor(private http: HttpClient) {
    console.log(environment.restUrl);
  }

  static getCorrectedRoom(room: Room) {
    return {id: room.roomId, name: room.roomName, price: room.price, capacity: room.capacity, status: room.status };
  }

  getRooms(): Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restUrl + '/api/rooms', {withCredentials: true})
      .pipe(
        map(data => {
          const rooms = new Array<Room>();
          for (const room of data) {
            rooms.push(Room.fromHttp(room));
          }
          return rooms;
        })
      );
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(environment.restUrl + '/api/rooms', RoomService.getCorrectedRoom(room), {withCredentials: true});
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(environment.restUrl + '/api/rooms', RoomService.getCorrectedRoom(room), {withCredentials: true});
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/rooms/' + id, {withCredentials: true});
  }

}
