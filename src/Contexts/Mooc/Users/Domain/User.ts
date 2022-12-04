import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { UserId } from '../../../Shared/Domain/Users/UserId';
import { UserCreatedDomainEvent } from './Events/UserCreatedDomainEvent';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';

export class User extends AggregateRoot {
  id: UserId;
  email: UserEmail;
  password: UserPassword;

  constructor(id: UserId, email: UserEmail, password: UserPassword) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
  }

  static create(id: UserId, email: UserEmail, password: UserPassword): User {
    const user = new User(id, email, password);

    user.record(
      new UserCreatedDomainEvent({
        aggregateId: user.id.value,
        email: user.email.value
      })
    );

    return user;
  }

  static fromPrimitives(plainData: { id: string; email: string; password: string }): User {
    return new User(
      new UserId(plainData.id),
      new UserEmail(plainData.email),
      new UserPassword(plainData.password)
    );
  }

  update(args: { password?: UserPassword }): void {
    if (args.password) this.password = args.password;
  }

  toPrimitives(): Primitives<User> {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value
    };
  }
}
