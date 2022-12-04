import { EventBus } from '../../../../Shared/Domain/EventBus';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { PostId } from '../../../Shared/Domain/Posts/PostId';
import { Post } from '../../Domain/Post';
import { PostMessage } from '../../Domain/PostMessage';
import { PostProfileName } from '../../Domain/PostProfileName';
import { PostsRepository } from '../../Domain/PostsRepository';

type CreatePostParams = {
  id: PostId;
  userId: UserId;
  profileName: PostProfileName;
  message: PostMessage;
};

export class CreatePost {
  constructor(private repository: PostsRepository, private eventBus: EventBus) {}

  async run({ id, userId, profileName, message }: CreatePostParams): Promise<void> {
    const post = Post.create(id, userId, profileName, message);

    await this.repository.save(post);
    await this.eventBus.publish(post.pullDomainEvents());
  }
}
