import { FollowerId } from '../../../../src/Contexts/Followers/Shared/Domain/Followers/FollowerId';
import { UuidMother } from '../../Shared/domain/UuidMother';

export class FollowerIdMother {
  static create(value: string): FollowerId {
    return new FollowerId(value);
  }

  static random(): FollowerId {
    return this.create(UuidMother.random());
  }
}
