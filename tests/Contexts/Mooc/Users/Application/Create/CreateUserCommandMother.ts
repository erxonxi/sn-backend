import { CreateUserCommand } from '../../../../../../src/Contexts/Mooc/Users/Domain/Commands/CreateUserCommand';
import { UserEmail } from '../../../../../../src/Contexts/Mooc/Users/Domain/UserEmail';
import { UserPassword } from '../../../../../../src/Contexts/Mooc/Users/Domain/UserPassword';
import { UserId } from '../../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../Shared/domain/UserIdMother';
import { UserEmailMother } from '../../Domain/UserEmailMother';
import { UserPasswordMother } from '../../Domain/UserPasswordMother';

export class CreateUserCommandMother {
  static create(id: UserId, email: UserEmail, password: UserPassword): CreateUserCommand {
    return { id: id.value, email: email.value, password: password.value };
  }

  static random(): CreateUserCommand {
    return this.create(
      UserIdMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random()
    );
  }

  static invalid(): CreateUserCommand {
    return {
      id: UserIdMother.random().value,
      email: UserEmailMother.invalid(),
      password: UserPasswordMother.random().value
    };
  }
}
