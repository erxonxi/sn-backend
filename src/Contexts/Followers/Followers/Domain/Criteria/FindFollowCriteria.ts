import { Criteria } from '../../../../Shared/Domain/criteria/Criteria';
import { Filters } from '../../../../Shared/Domain/criteria/Filters';
import { Order } from '../../../../Shared/Domain/criteria/Order';
import { UserId } from '../../../../Shared/Domain/Users/UserId';

export class FindFollowCriteria extends Criteria {
  constructor(userId: UserId, followerUserId: UserId) {
    super(
      Filters.fromValues([
        new Map([
          ['field', 'userId'],
          ['operator', '='],
          ['value', userId.toString()]
        ]),
        new Map([
          ['field', 'followerUserId'],
          ['operator', '='],
          ['value', followerUserId.toString()]
        ])
      ]),
      Order.none()
    );
  }
}
