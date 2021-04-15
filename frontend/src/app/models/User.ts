import {Role} from '../enum/Role';

export class User {
  userId: number;
  userName: string;
  userPassword: string;
  userEmail: string;
  role: Role;
  token: string;

  static fromHttp(user: User): User {
    const newUser = new User();
    newUser.userId = user.userId;
    newUser.userName = user.userName;
    newUser.userPassword = user.userPassword;
    newUser.userEmail = user.userEmail;
    return newUser;
  }
  getRole(): string {
    return 'standard';
  }
}
