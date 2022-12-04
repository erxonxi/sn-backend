import { Post } from '../../../Posts/Posts/Domain/Post';
import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { UserId } from '../../../Shared/Domain/Users/UserId';
import { FeedId } from '../../Shared/Domain/Feeds/FeedId';

export class Feed extends AggregateRoot {
  id: FeedId;
  userId: UserId;
  feed: Post[];

  constructor(id: FeedId, userId: UserId, feed: Post[]) {
    super();
    this.id = id;
    this.userId = userId;
    this.feed = feed;
  }

  static create(id: FeedId, userId: UserId, feed: Post[]): Feed {
    const user = new Feed(id, userId, feed);

    return user;
  }

  static fromPrimitives(plainData: { id: string; userId: string; feed: Primitives<Post>[] }): Feed {
    return new Feed(
      new FeedId(plainData.id),
      new UserId(plainData.userId),
      plainData.feed.map(p =>
        Post.fromPrimitives({
          id: p.id,
          userId: p.userId,
          message: p.message,
          profileName: p.profileName,
          createdAt: p.createdAt.toString()
        })
      )
    );
  }

  insertPost(post: Post) {
    this.feed.push(post);
  }

  shortFeed() {
    this.feed.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }

      if (a.createdAt > b.createdAt) {
        return -1;
      }

      return 0;
    });
  }

  toPrimitives() {
    return {
      id: this.id.value,
      userId: this.userId.value,
      feed: this.feed.map(p => p.toPrimitives())
    };
  }
}
