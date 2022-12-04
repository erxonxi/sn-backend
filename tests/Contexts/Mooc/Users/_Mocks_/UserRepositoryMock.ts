import { User } from '../../../../../src/Contexts/Mooc/Users/Domain/User';
import { UserRepository } from '../../../../../src/Contexts/Mooc/Users/Domain/UserRepository';
import { Criteria } from '../../../../../src/Contexts/Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { UserId } from '../../../../../src/Contexts/Shared/Domain/Users/UserId';

export class UserRepositoryMock implements UserRepository {
  private saveMock: jest.Mock;
  private searchAllMock: jest.Mock;
  private matchingMock: jest.Mock;
  private searchMock: jest.Mock;
  private users: Array<User> = [];
  private user: Nullable<User> = null;

  constructor() {
    this.saveMock = jest.fn();
    this.searchAllMock = jest.fn();
    this.matchingMock = jest.fn();
    this.searchMock = jest.fn();
  }

  async save(user: User): Promise<void> {
    this.saveMock(user);
  }

  assertSaveHaveBeenCalledWith(expected: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSaveHaveBeenCalled(): void {
    expect(this.saveMock).toHaveBeenCalled();
  }

  returnAll(users: Array<User>) {
    this.users = users;
  }

  returnMatching(users: Array<User>) {
    this.users = users;
  }

  assertAll() {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  async all(): Promise<User[]> {
    this.searchAllMock();
    return this.users;
  }

  async matching(criteria: Criteria): Promise<User[]> {
    this.matchingMock(criteria);
    return this.users;
  }

  async search(id: UserId): Promise<Nullable<User>> {
    this.searchMock(id);
    return this.user;
  }
}
