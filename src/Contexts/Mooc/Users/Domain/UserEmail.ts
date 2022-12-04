import { StringValueObject } from '../../../Shared/Domain/value-object/StringValueObject';
import { InvalidUserArgumentError } from './Errors/InvalidUserProperty';

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.checkIsEmail(value);
  }

  private checkIsEmail(value: string): void {
    const checkRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    if (!checkRegex) {
      throw new InvalidUserArgumentError('email', value);
    }
  }
}
