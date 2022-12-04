import { User } from '../Domain/User';

interface UserResponse {
  id: string;
  email: string;
}

export class UsersResponse {
  public readonly users: Array<UserResponse>;

  constructor(users: Array<User>) {
    this.users = users.map(user => ({
      id: user.id.toString(),
      email: user.email.toString()
    }));
  }
}
