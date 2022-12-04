import { InvalidArgumentError } from '../../../../Shared/Domain/value-object/InvalidArgumentError';

export class UserNotFound extends InvalidArgumentError {
  constructor() {
    super('User not found');
  }
}
