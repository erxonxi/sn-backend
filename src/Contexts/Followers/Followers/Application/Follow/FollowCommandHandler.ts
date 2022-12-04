import { Command } from '../../../../Shared/Domain/Command';
import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { FollowerId } from '../../../Shared/Domain/Followers/FollowerId';
import { FollowCommand } from '../../Domain/Commands/FollowCommand';
import { Follow } from './Follow';

export class FollowCommandHandler implements CommandHandler<FollowCommand> {
  constructor(private follow: Follow) {}

  subscribedTo(): Command {
    return FollowCommand;
  }

  async handle(command: FollowCommand): Promise<void> {
    const id = new FollowerId(command.id);
    const userId = new UserId(command.userId);
    const followerUserId = new UserId(command.followerUserId);
    await this.follow.run({ id, userId, followerUserId });
  }
}
