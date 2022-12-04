import { UserPassword } from '../../../../../src/Contexts/Mooc/Users/Domain/UserPassword';
import { WordMother } from '../../../Shared/domain/WordMother';

export class UserPasswordMother {
  static create(value: string): UserPassword {
    return new UserPassword(value);
  }

  static random(): UserPassword {
    return this.create(WordMother.random({ maxLength: 16 }));
  }
}
