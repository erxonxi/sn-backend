import { Post } from '../../../../Posts/Posts/Domain/Post';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { FeedId } from '../../../Shared/Domain/Feeds/FeedId';
import { FeedUserCriteria } from '../../Domain/Criteria/FeedUserCriteria';
import { Feed } from '../../Domain/Feed';
import { FeedsRepository } from '../../Domain/FeedsRepository';
import { FollowersService } from '../../Domain/FollowersService';

type InsertPortParams = {
  post: Post;
};

export class InsertPost {
  constructor(
    private repository: FeedsRepository,
    private eventBus: EventBus,
    private followersService: FollowersService
  ) {}

  async execute({ post }: InsertPortParams) {
    const followersIds = await this.followersService.getFolloersOfUser(post.userId);

    followersIds.forEach(async follower => {
      const feed: Feed = await this.getFeedOrCreate(follower.followerUserId);

      feed.insertPost(post);
      feed.shortFeed();

      await this.repository.save(feed);
      await this.eventBus.publish(feed.pullDomainEvents());
    });
  }

  async getFeedOrCreate(id: UserId): Promise<Feed> {
    const feeds = await this.repository.matching(new FeedUserCriteria(id));

    let feed: Feed;
    if (feeds.length > 0) {
      feed = feeds[0];
    } else {
      feed = Feed.create(FeedId.random(), id, []);
    }

    return feed;
  }
}
