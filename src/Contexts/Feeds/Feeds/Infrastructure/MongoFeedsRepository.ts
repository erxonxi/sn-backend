import { Document } from 'mongodb';
import { Post } from '../../../Posts/Posts/Domain/Post';
import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { MongoRepository } from '../../../Shared/Infrastructure/persistence/mongo/MongoRepository';
import { FeedId } from '../../Shared/Domain/Feeds/FeedId';
import { Feed } from '../Domain/Feed';
import { FeedsRepository } from '../Domain/FeedsRepository';

interface FeedDocument extends Document {
  _id: string;
  userId: string;
  feed: Primitives<Post>[];
}

export class MongoFeedsRepository extends MongoRepository<Feed> implements FeedsRepository {
  protected collectionName(): string {
    return 'feeds';
  }

  public save(user: Feed): Promise<void> {
    return this.persist(user.id.value, user);
  }

  public async search(id: FeedId): Promise<Nullable<Feed>> {
    const collection = await this.collection();
    const document = await collection.findOne<FeedDocument>({ _id: id.value });

    return document
      ? Feed.fromPrimitives({
          userId: document.userId,
          feed: document.feed,
          id: document._id
        })
      : null;
  }

  public async all(): Promise<Feed[]> {
    const collection = await this.collection();
    const documents = await collection.find<FeedDocument>({}).toArray();

    return documents.map(document =>
      Feed.fromPrimitives({
        userId: document.userId,
        feed: document.feed,
        id: document._id
      })
    );
  }

  public async matching(criteria: Criteria): Promise<Feed[]> {
    const documents = await this.searchByCriteria<FeedDocument>(criteria);

    return documents.map(document =>
      Feed.fromPrimitives({
        userId: document.userId,
        feed: document.feed,
        id: document._id
      })
    );
  }

  public async delete(criteria: Criteria): Promise<void> {
    return this.deleteByCriteria(criteria);
  }
}
