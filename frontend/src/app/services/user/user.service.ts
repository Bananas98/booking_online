import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Role} from '../../enum/Role';
import {User} from '../../models/User';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    // console.log(environment.restUrl);
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restUrl + '/api/users', {withCredentials: true})
      .pipe(
        map(data => {
          const users = new Array<User>();
          for (const user of data) {
            users.push(User.fromHttp(user));
          }
          return users;
        })
      );
  }

  updateUser(user: User): Observable<User> {
    return of(user);
    return this.http.put<User>(environment.restUrl + '/api/users', user, {withCredentials: true});
  }

  addUser(newUser: User): Observable<User> {
    const fullUser = {id: newUser.userId, name: newUser.userName, password: newUser.userPassword, email: newUser.userEmail};
    return this.http.post<User>(environment.restUrl + '/api/users', fullUser, {withCredentials: true});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.restUrl + '/api/users/' + id, {withCredentials: true});
  }

  resetUserPassword(id: number): Observable<any> {
    return this.http.get(environment.restUrl + '/api/users/resetPassword/' + id, {withCredentials: true});
  }


  getRole(): Observable<{ role: Role }> {
    const headers = new HttpHeaders().append('X-Requested-With', 'XMLHttpRequest');
    return this.http.get<{ role: Role }>(environment.restUrl + '/api/users/currentUserRole', {
      headers,
      withCredentials: true
    });
  }

  validateUser(name: string, password: string): Observable<{ result: string }> {
    const authData = btoa(`${name}:${password}`);
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + authData);
    return this.http.get<{ result: string }>(environment.restUrl + '/api/basicAuth/validate', {
      headers,
      withCredentials: true
    });
  }

  logout(): Observable<string> {
    return this.http.get<string>(environment.restUrl + '/api/users/logout', {withCredentials: true});
  }
}
