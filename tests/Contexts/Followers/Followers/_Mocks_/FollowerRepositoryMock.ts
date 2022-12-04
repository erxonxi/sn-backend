import { Follower } from '../../../../../src/Contexts/Followers/Followers/Domain/Follower';
import { FollowersRepository } from '../../../../../src/Contexts/Followers/Followers/Domain/FollowersRepository';
import { FollowerId } from '../../../../../src/Contexts/Followers/Shared/Domain/Followers/FollowerId';
import { Criteria } from '../../../../../src/Contexts/Shared/Domain/criteria/Criteria';
import { Operator } from '../../../../../src/Contexts/Shared/Domain/criteria/FilterOperator';
import { Nullable } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { ArrayCriteriaConverter } from '../../../Shared/domain/ArrayCriteriaConverter';

export class FollowerRepositoryMock implements FollowersRepository {
  private saveMock: jest.Mock;
  private searchAllMock: jest.Mock;
  private matchingMock: jest.Mock;
  private searchMock: jest.Mock;
  private deleteMock: jest.Mock;
  private followers: Array<Follower> = [];
  private follower: Nullable<Follower> = null;

  constructor() {
    this.saveMock = jest.fn();
    this.searchAllMock = jest.fn();
    this.matchingMock = jest.fn();
    this.searchMock = jest.fn();
    this.deleteMock = jest.fn();
  }

  async delete(criteria: Criteria): Promise<void> {
    this.deleteMock(criteria);
    this.followers = this.followers.filter((aggregate: any) => {
      if (criteria.filters.filters.length > 0) {
        var toReturn: boolean[] = [];

        criteria.filters.filters.forEach(filter => {
          let comparation = false;
          switch (filter.operator.value) {
            case Operator.CONTAINS: {
              comparation = String(aggregate[filter.field.value].value).includes(
                filter.value as any
              );
            }
            case Operator.EQUAL: {
              comparation = aggregate[filter.field.value].value == filter.value;
            }
            case Operator.NOT_EQUAL: {
              comparation = aggregate[filter.field.value].value != filter.value;
            }
            case Operator.GT: {
              comparation = aggregate[filter.field.value].value < filter.value;
            }
            case Operator.LT: {
              comparation = aggregate[filter.field.value].value > filter.value;
            }
          }

          toReturn.push(comparation);
        });

        if (toReturn.every(key => key === true)) return aggregate;
      } else {
        return aggregate;
      }
    });
  }

  async save(follower: Follower): Promise<void> {
    this.saveMock(follower);
    this.followers.push(follower);
  }

  assertSaveHaveBeenCalledWith(expected: Follower): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSaveHaveBeenCalled(): void {
    expect(this.saveMock).toHaveBeenCalled();
  }

  assertDeleteHaveBeenCalled(): void {
    expect(this.deleteMock).toHaveBeenCalled();
  }

  returnAll(followers: Array<Follower>) {
    this.followers = followers;
  }

  returnMatching(followers: Array<Follower>) {
    this.followers = followers;
  }

  assertAll() {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  async all(): Promise<Follower[]> {
    this.searchAllMock();
    return this.followers;
  }

  async matching(criteria: Criteria): Promise<Follower[]> {
    this.matchingMock(criteria);
    return ArrayCriteriaConverter.convert(this.followers, criteria);
  }

  async search(id: FollowerId): Promise<Nullable<Follower>> {
    this.searchMock(id);
    return this.follower;
  }
}
