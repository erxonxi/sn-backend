import { Query } from '../../../../Shared/Domain/Query';

export class GetProfileQuery extends Query {
  constructor(public readonly userId: string) {
    super();
  }
}
