import { Command } from '../../../../Shared/Domain/Command';

type Params = {
  id: string;
  userId: string;
  followerUserId: string;
};

export class FollowCommand extends Command {
  id: string;
  userId: string;
  followerUserId: string;

  constructor({ id, userId, followerUserId }: Params) {
    super();
    this.id = id;
    this.userId = userId;
    this.followerUserId = followerUserId;
  }
}
