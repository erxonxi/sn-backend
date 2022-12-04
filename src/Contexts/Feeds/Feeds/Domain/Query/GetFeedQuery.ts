import { Query } from '../../../../Shared/Domain/Query';

export class GetFeedQuery extends Query {
  constructor(public readonly userId: string) {
    super();
  }
}
