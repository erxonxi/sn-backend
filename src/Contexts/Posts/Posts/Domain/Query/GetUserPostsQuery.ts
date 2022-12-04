import { Query } from '../../../../Shared/Domain/Query';

export class GetUserPostsQuery implements Query {
  constructor(public readonly userId: string) {}
}
