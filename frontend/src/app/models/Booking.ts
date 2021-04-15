import {Room} from './Room';
import {User} from './User';

export class Booking {
  bookingId: number;
  bookingStartDate: Date;
  bookingEndDate: Date;
  countOfVisitor: number;
  status: boolean;
  room: Room;
  user: User;

  static fromHttp(booking: Booking) {
    const newBooking = new Booking();
    newBooking.bookingId = booking.bookingId;
    newBooking.room = Room.fromHttp(booking.room);
    newBooking.user = User.fromHttp(booking.user);
    newBooking.bookingStartDate = booking.bookingStartDate;
    newBooking.bookingEndDate = booking.bookingEndDate;
    newBooking.countOfVisitor = booking.countOfVisitor;
    newBooking.status = booking.status;
    return newBooking;
  }
}
