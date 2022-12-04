import { PostProfileName } from '../../../../../src/Contexts/Posts/Posts/Domain/PostProfileName';
import { WordMother } from '../../../Shared/domain/WordMother';

export class PostProfileNameMother {
  static create(value: string): PostProfileName {
    return new PostProfileName(value);
  }

  static random(): PostProfileName {
    return this.create(WordMother.random({ maxLength: 255 }));
  }
}
