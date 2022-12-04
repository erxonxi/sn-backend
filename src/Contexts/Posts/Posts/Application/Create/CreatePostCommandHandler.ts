import { Command } from '../../../../Shared/Domain/Command';
import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { PostId } from '../../../Shared/Domain/Posts/PostId';
import { CreatePostCommand } from '../../Domain/Command/CreatePostCommand';
import { PostMessage } from '../../Domain/PostMessage';
import { PostProfileName } from '../../Domain/PostProfileName';
import { CreatePost } from './CreatePost';

export class CreatePostCommandHandler implements CommandHandler<CreatePostCommand> {
  constructor(private createPost: CreatePost) {}

  subscribedTo(): Command {
    return CreatePostCommand;
  }

  async handle(command: CreatePostCommand): Promise<void> {
    const id = new PostId(command.id);
    const userId = new UserId(command.userId);
    const message = new PostMessage(command.message);
    const profileName = new PostProfileName(command.profileName);
    await this.createPost.run({ id, userId, message, profileName });
  }
}
