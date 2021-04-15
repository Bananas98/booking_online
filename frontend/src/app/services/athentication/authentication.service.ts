import {EventEmitter, Injectable} from '@angular/core';
import {Role} from '../../enum/Role';
import {RoomService} from '../room/room.service';
import {UserService} from '../user/user.service';
import {User} from '../../models/User';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isAuthenticated = false;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { username, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  // authenticationResultEvent = new EventEmitter<boolean>();
  // role: Role;
  // roleSetEvent = new EventEmitter<Role>();
  //
  // constructor(private roomService: RoomService, private userService: UserService) { }
  //
  // authenticate(name: string, password: string) {
  //   this.userService.validateUser(name, password).subscribe(
  //     next => {
  //       this.setupRole();
  //       this.isAuthenticated = true;
  //       this.authenticationResultEvent.emit(true);
  //     }, error => {
  //       this.isAuthenticated = false;
  //       this.authenticationResultEvent.emit(false);
  //     }
  //   );
  // }
  //
  // setupRole() {
  //   this.userService.getRole().subscribe(
  //     next => {
  //       this.role = next.role;
  //       this.roleSetEvent.emit(next.role);
  //     }
  //   );
  // }
  //
  // checkIfAlreadyAuthenticated() {
  //   this.userService.getRole().subscribe(
  //     next => {
  //       if (next.role !== null || undefined) {
  //         this.role = next.role;
  //         this.roleSetEvent.emit(next.role);
  //         this.isAuthenticated = true;
  //         this.authenticationResultEvent.emit(true);
  //       }
  //     }
  //   );
  // }
  //
  // logout() {
  //   this.userService.logout().subscribe();
  //   this.isAuthenticated = false;
  //   this.authenticationResultEvent.emit(false);
  // }
}
