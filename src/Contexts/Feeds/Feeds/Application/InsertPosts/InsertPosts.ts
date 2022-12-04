import { EventBus } from '../../../../Shared/Domain/EventBus';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { FeedsRepository } from '../../Domain/FeedsRepository';
import { PostsService } from '../../Domain/PostsService';
import { GetFeed } from '../GetFeed/GetFeed';

type InsertPostsParams = {
  userId: UserId;
  followerUserId: UserId;
};

export class InsertPosts {
  constructor(
    private readonly repository: FeedsRepository,
    private readonly getFeed: GetFeed,
    private readonly postsService: PostsService,
    private readonly eventBus: EventBus
  ) {}

  async execute({ userId, followerUserId }: InsertPostsParams) {
    const posts = await this.postsService.getUserPosts(userId);

    if (posts.length <= 0) {
      return;
    }

    const feed = await this.getFeed.execute(followerUserId);
    posts.forEach(p => feed.insertPost(p));
    feed.shortFeed();

    this.repository.save(feed);
    this.eventBus.publish(feed.pullDomainEvents());
  }
}
