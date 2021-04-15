import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Booking} from '../../models/Booking';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RoomService} from '../room/room.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient, private roomService: RoomService) {
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(environment.restUrl + '/api/bookings?id=' + id, {withCredentials: true})
      .pipe(
        map(data => Booking.fromHttp(data))
      );
  }

  saveBooking(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(environment.restUrl + '/api/bookings', this.getCorrectedBooking(booking), {withCredentials: true});
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    return this.http.post<Booking>(environment.restUrl + '/api/bookings', this.getCorrectedBooking(newBooking), {withCredentials: true});
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/bookings/' + id, {withCredentials: true});
  }


  private getCorrectedBooking(booking: Booking) {
    return {
      id: booking.bookingId, room: RoomService.getCorrectedRoom(booking.room), user: booking.user,
      bookingStartDate: booking.bookingStartDate, bookingEndDate: booking.bookingEndDate,
      countOfVisitor: booking.countOfVisitor, stays: booking.status
    };
  }

}
