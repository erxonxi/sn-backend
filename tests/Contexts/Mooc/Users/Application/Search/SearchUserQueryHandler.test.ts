import { SearchUsersQueryHandler } from '../../../../../../src/Contexts/Mooc/Users/Application/Search/SearchUsersQueryHandler';
import { SearchUsers } from '../../../../../../src/Contexts/Mooc/Users/Application/Search/SearchUsers';
import { SearchUsersQuery } from '../../../../../../src/Contexts/Mooc/Users/Application/Search/SearchUsersQuery';
import { OrderTypes } from '../../../../../../src/Contexts/Shared/Domain/criteria/OrderType';
import { UserMother } from '../../Domain/UserMother';
import { UserRepositoryMock } from '../../_Mocks_/UserRepositoryMock';
import { UsersResponseMother } from '../SearchUserResponseMother';

describe('SearchUsersQueryHandler', () => {
  let repository: UserRepositoryMock;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  });

  it('should find courses filter by criteria', async () => {
    const users = [UserMother.random(), UserMother.random(), UserMother.random()];
    repository.returnMatching(users);

    const handler = new SearchUsersQueryHandler(new SearchUsers(repository));

    const filterName: Map<string, string> = new Map([
      ['field', 'email'],
      ['operator', 'CONTAINS'],
      ['value', 'juan']
    ]);

    const filters: Array<Map<string, string>> = [filterName];

    const query = new SearchUsersQuery(filters);
    const response = await handler.handle(query);

    const expected = UsersResponseMother.create(users);
    expect(expected).toEqual(response);
  });

  it('should find courses filter by criteria with order, limit and offset', async () => {
    const users = [UserMother.random(), UserMother.random(), UserMother.random()];
    repository.returnMatching(users);

    const handler = new SearchUsersQueryHandler(new SearchUsers(repository));

    const filterName: Map<string, string> = new Map([
      ['field', 'name'],
      ['operator', 'CONTAINS'],
      ['value', 'DDD']
    ]);
    const filterDuration: Map<string, string> = new Map([
      ['field', 'duration'],
      ['operator', 'CONTAINS'],
      ['value', 'minutes']
    ]);

    const filters: Array<Map<string, string>> = [filterName, filterDuration];
    const orderBy = 'name';
    const orderType = OrderTypes.ASC;

    const query = new SearchUsersQuery(filters, orderBy, orderType, 10, 1);
    const response = await handler.handle(query);

    const expected = UsersResponseMother.create(users);
    expect(expected).toEqual(response);
  });
});
