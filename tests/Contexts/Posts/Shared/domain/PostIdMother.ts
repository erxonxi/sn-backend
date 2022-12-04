import { PostId } from '../../../../../src/Contexts/Posts/Shared/Domain/Posts/PostId';
import { UuidMother } from '../../../Shared/domain/UuidMother';

export class PostIdMother {
  static create(value: string): PostId {
    return new PostId(value);
  }

  static random(): PostId {
    return this.create(UuidMother.random());
  }
}
