import { UsersResponse } from '../../../../../src/Contexts/Mooc/Users/Application/UsersResponse';
import { User } from '../../../../../src/Contexts/Mooc/Users/Domain/User';

export class UsersResponseMother {
  static create(users: Array<User>) {
    return new UsersResponse(users);
  }
}
