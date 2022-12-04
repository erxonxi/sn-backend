import { Criteria } from '../../../../Shared/Domain/criteria/Criteria';
import { Filters } from '../../../../Shared/Domain/criteria/Filters';
import { Order } from '../../../../Shared/Domain/criteria/Order';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { HashEncrypt } from '../../../../Shared/Infrastructure/Encrypt/HashEncrypt';
import { UserNotFound } from '../../Domain/Errors/UserNotFound';
import { User } from '../../Domain/User';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { UserRepository } from '../../Domain/UserRepository';

export class CreateUser {
  constructor(
    private repository: UserRepository,
    private eventBus: EventBus,
    private encrypter: HashEncrypt
  ) {}

  async run(params: { id: UserId; email: UserEmail; password: UserPassword }): Promise<void> {
    await this.checkUserEmailExist(params.email);

    const passwordHashed = await this.hashPassword(params.password);
    const user = User.create(params.id, params.email, passwordHashed);

    await this.repository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  }

  async hashPassword(password: UserPassword): Promise<UserPassword> {
    const passwordHashedValue = await this.encrypter.hash(password.toString());
    return new UserPassword(passwordHashedValue);
  }

  private async checkUserEmailExist(email: UserEmail) {
    const criteria = this.getCriteriaByEmail(email);
    const users = await this.repository.matching(criteria);

    if (users.length > 0) {
      throw new UserNotFound();
    }
  }

  private getCriteriaByEmail(email: UserEmail) {
    const filterName: Map<string, string> = new Map([
      ['field', 'email'],
      ['operator', '='],
      ['value', email.toString()]
    ]);

    const filters = Filters.fromValues([filterName]);
    const order = Order.fromValues();

    return new Criteria(filters, order);
  }
}
