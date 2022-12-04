import { Command } from '../../../../Shared/Domain/Command';

type Params = {
  userId: string;
  followerUserId: string;
};

export class UnfollowCommand extends Command {
  userId: string;
  followerUserId: string;

  constructor({ userId, followerUserId }: Params) {
    super();
    this.userId = userId;
    this.followerUserId = followerUserId;
  }
}
