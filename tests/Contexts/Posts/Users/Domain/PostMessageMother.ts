import { PostMessage } from '../../../../../src/Contexts/Posts/Posts/Domain/PostMessage';
import { WordMother } from '../../../Shared/domain/WordMother';

export class PostMessageMother {
  static create(value: string): PostMessage {
    return new PostMessage(value);
  }

  static random(): PostMessage {
    return this.create(WordMother.random({ maxLength: 255 }));
  }
}
