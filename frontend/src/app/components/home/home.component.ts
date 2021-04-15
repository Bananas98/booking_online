import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Room} from '../../models/Room';
import {RoomService} from '../../services/room/room.service';
import {AuthenticationService} from '../../services/athentication/authentication.service';
import {first} from 'rxjs/operators';
import {User} from '../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentRoom: Room;
  currentUser: User;
  currentUserSubscription: Subscription;
  rooms: Room[] = [];

  constructor(private authenticationService: AuthenticationService, private roomService: RoomService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllRooms();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
  private loadAllRooms() {
    this.roomService.getRooms().pipe(first()).subscribe(rooms => {
      this.rooms = rooms;
    });
  }

}
