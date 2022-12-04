import { Criteria } from '../../../../Shared/Domain/criteria/Criteria';
import { Filters } from '../../../../Shared/Domain/criteria/Filters';
import { Order } from '../../../../Shared/Domain/criteria/Order';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { HashEncrypt } from '../../../../Shared/Infrastructure/Encrypt/HashEncrypt';
import { JwtEncrypt } from '../../../../Shared/Infrastructure/Encrypt/JwtEncrypt';
import { UserNotFound } from '../../Domain/Errors/UserNotFound';
import { User } from '../../Domain/User';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { UserRepository } from '../../Domain/UserRepository';
import { UserSession } from '../../Domain/UserSession';
import { GetSessionResponse } from './GetSessionResponse';

export class GetSession {
  constructor(
    private repository: UserRepository,
    private encrypter: HashEncrypt,
    private jwtEncrypter: JwtEncrypt
  ) {}

  async run(params: { email: UserEmail; password: UserPassword }): Promise<GetSessionResponse> {
    const user = await this.getUserByEmail(params.email);

    const checkPassword = await this.encrypter.compare(
      params.password.toString(),
      user.password.toString()
    );

    if (!checkPassword) {
      throw new UserNotFound();
    }

    const session = new UserSession(Uuid.random().toString(), {
      id: user.id.toString(),
      email: user.email.toString()
    });
    const token = this.jwtEncrypter.encrypt(session.toPrimitives());

    return {
      session: session.toPrimitives(),
      token
    };
  }

  private async getUserByEmail(email: UserEmail): Promise<User> {
    const criteria = this.getCriteriaByEmail(email);

    const users = await this.repository.matching(criteria);

    if (users.length === 0) {
      throw new UserNotFound();
    }

    return users[0];
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
