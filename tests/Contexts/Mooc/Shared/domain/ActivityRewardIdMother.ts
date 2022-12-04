import { ActivityRewardId } from '../../../../../src/Contexts/Mooc/Shared/Domain/ActivityRewards/ActivityRewardId';
import { UuidMother } from '../../../Shared/domain/UuidMother';

export class ActivityRewardIdMother {
  static create(value: string): ActivityRewardId {
    return new ActivityRewardId(value);
  }

  static random(): ActivityRewardId {
    return this.create(UuidMother.random());
  }
}
