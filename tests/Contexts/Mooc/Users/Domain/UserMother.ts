import { UserPassword } from '../../../../../src/Contexts/Mooc/Users/Domain/UserPassword';
import { User } from '../../../../../src/Contexts/Mooc/Users/Domain/User';
import { UserIdMother } from '../../Shared/domain/UserIdMother';
import { UserEmailMother } from './UserEmailMother';
import { UserPasswordMother } from './UserPasswordMother';
import { UserEmail } from '../../../../../src/Contexts/Mooc/Users/Domain/UserEmail';
import { CreateUserCommand } from '../../../../../src/Contexts/Mooc/Users/Domain/Commands/CreateUserCommand';
import { UserId } from '../../../../../src/Contexts/Shared/Domain/Users/UserId';

export class UserMother {
  static create(id: UserId, email: UserEmail, password: UserPassword): User {
    return new User(id, email, password);
  }

  static from(command: CreateUserCommand): User {
    return this.create(
      UserIdMother.create(command.id),
      UserEmailMother.create(command.email),
      UserPasswordMother.create(command.password)
    );
  }

  static random(): User {
    return this.create(
      UserIdMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random()
    );
  }
}
