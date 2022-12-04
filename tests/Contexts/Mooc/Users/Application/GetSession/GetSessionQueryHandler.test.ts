import { GetSessionQueryHandler } from '../../../../../../src/Contexts/Mooc/Users/Application/GetSession/GetSessionQueryHandler';
import { GetSessionQuery } from '../../../../../../src/Contexts/Mooc/Users/Domain/Querys/GetSessionQuery';
import { GetSession } from '../../../../../../src/Contexts/Mooc/Users/Application/GetSession/GetSession';
import { HashEncrypt } from '../../../../../../src/Contexts/Shared/Infrastructure/Encrypt/HashEncrypt';
import { JwtEncrypt } from '../../../../../../src/Contexts/Shared/Infrastructure/Encrypt/JwtEncrypt';
import { UserRepositoryMock } from '../../_Mocks_/UserRepositoryMock';
import { UserMother } from '../../Domain/UserMother';
import { UserPassword } from '../../../../../../src/Contexts/Mooc/Users/Domain/UserPassword';

describe('GetSessionQueryHandler', () => {
  let repository: UserRepositoryMock;
  let service: GetSession;
  let encrypter: HashEncrypt;
  let jwtEncrypter: JwtEncrypt;

  beforeEach(() => {
    repository = new UserRepositoryMock();
    encrypter = new HashEncrypt();
    jwtEncrypter = new JwtEncrypt({ secret: 'SUPER_SECRET' });
    service = new GetSession(repository, encrypter, jwtEncrypter);
  });

  it('get session and token with valid data', async () => {
    const fakeUser = UserMother.random();
    const password = fakeUser.password;
    const passwordHashed = await encrypter.hash(password.toString());
    fakeUser.password = new UserPassword(passwordHashed);
    repository.returnMatching([fakeUser]);

    const handler = new GetSessionQueryHandler(service);
    const query = new GetSessionQuery(fakeUser.email.toString(), password.toString());
    const response = await handler.handle(query);

    const { user } = response.session;

    expect(typeof response.token).toEqual('string');
    expect(user.id).toEqual(user.id.toString());
    expect(user.email).toEqual(user.email.toString());
  });
});
