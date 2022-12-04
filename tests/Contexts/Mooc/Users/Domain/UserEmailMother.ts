import { UserEmail } from '../../../../../src/Contexts/Mooc/Users/Domain/UserEmail';
import { WordMother } from '../../../Shared/domain/WordMother';

export class UserEmailMother {
  static create(value: string): UserEmail {
    return new UserEmail(value);
  }

  static random(): UserEmail {
    const prefix = WordMother.random({ maxLength: 6 });
    return this.create(`${prefix}@gmail.com`);
  }

  static invalid(): string {
    const word = WordMother.random({ maxLength: 8 });
    return word.repeat(3).replace('@', '');
  }
}
