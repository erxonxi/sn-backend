import { Query } from '../../../../Shared/Domain/Query';

export class GetFollowersOfUserQuery extends Query {
  constructor(public readonly userId: string) {
    super();
  }
}
