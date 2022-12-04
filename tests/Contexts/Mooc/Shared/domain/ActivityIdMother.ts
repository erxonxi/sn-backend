import { ActivityId } from '../../../../../src/Contexts/Mooc/Shared/Domain/Activities/ActivityId';
import { UuidMother } from '../../../Shared/domain/UuidMother';

export class ActivityIdMother {
  static create(value: string): ActivityId {
    return new ActivityId(value);
  }

  static random(): ActivityId {
    return this.create(UuidMother.random());
  }
}
