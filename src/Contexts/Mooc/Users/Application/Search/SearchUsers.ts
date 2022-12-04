import { Criteria } from '../../../../Shared/Domain/criteria/Criteria';
import { Filters } from '../../../../Shared/Domain/criteria/Filters';
import { Order } from '../../../../Shared/Domain/criteria/Order';
import { UserRepository } from '../../Domain/UserRepository';
import { UsersResponse } from '../UsersResponse';

export class SearchUsers {
  constructor(private repository: UserRepository) {}

  async run(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number
  ): Promise<UsersResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const users = await this.repository.matching(criteria);

    return new UsersResponse(users);
  }
}
