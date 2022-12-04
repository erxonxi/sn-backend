import { InvalidArgumentError } from '../../../../Shared/Domain/value-object/InvalidArgumentError';

export class FollowerNotFound extends InvalidArgumentError {
  constructor() {
    super('Follower not found');
  }
}
