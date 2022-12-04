import { InvalidArgumentError } from '../../../../Shared/Domain/value-object/InvalidArgumentError';

export class InvalidFollowerArgumentError extends InvalidArgumentError {
  constructor(argument: string, value: string) {
    const message = `Invalid User argument for "${argument}" the value "${String(value)}"`;
    super(message);
  }
}
