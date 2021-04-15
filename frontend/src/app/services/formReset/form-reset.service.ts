import {EventEmitter, Injectable} from '@angular/core';
import {Room} from '../../models/Room';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetRoomFormEvent = new EventEmitter<Room>();
  resetUserFormEvent = new EventEmitter<User>();
  constructor() { }
}
