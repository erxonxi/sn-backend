import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { FeedId } from '../../../Shared/Domain/Feeds/FeedId';
import { FeedUserCriteria } from '../../Domain/Criteria/FeedUserCriteria';
import { Feed } from '../../Domain/Feed';
import { FeedsRepository } from '../../Domain/FeedsRepository';

export class GetFeed {
  constructor(private repository: FeedsRepository) {}

  async execute(userId: UserId) {
    const feeds = await this.repository.matching(new FeedUserCriteria(userId));

    let feed: Feed;
    if (feeds.length > 0) {
      feed = feeds[0];
    } else {
      feed = Feed.create(FeedId.random(), userId, []);
    }

    return feed;
  }
}
