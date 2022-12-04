import { Command } from '../../../../Shared/Domain/Command';
import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { UnfollowCommand } from '../../Domain/Commands/UnfollowCommand';
import { Unfollow } from './Unfollow';

export class UnfollowCommandHandler implements CommandHandler<UnfollowCommand> {
  constructor(private unfollow: Unfollow) {}

  subscribedTo(): Command {
    return UnfollowCommand;
  }

  async handle(command: UnfollowCommand): Promise<void> {
    const userId = new UserId(command.userId);
    const followerUserId = new UserId(command.followerUserId);
    await this.unfollow.run({ userId, followerUserId });
  }
}
