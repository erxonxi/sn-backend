import { Document } from 'mongodb';
import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { MongoRepository } from '../../../Shared/Infrastructure/persistence/mongo/MongoRepository';
import { FollowerId } from '../../Shared/Domain/Followers/FollowerId';
import { Follower } from '../Domain/Follower';
import { FollowersRepository } from '../Domain/FollowersRepository';

interface FollowerDocument extends Document {
  _id: string;
  userId: string;
  followerUserId: string;
}

export class MongoFollowersRepository
  extends MongoRepository<Follower>
  implements FollowersRepository
{
  protected collectionName(): string {
    return 'followers';
  }

  public save(user: Follower): Promise<void> {
    return this.persist(user.id.value, user);
  }

  public async search(id: FollowerId): Promise<Nullable<Follower>> {
    const collection = await this.collection();
    const document = await collection.findOne<FollowerDocument>({ _id: id.value });

    return document
      ? Follower.fromPrimitives({
          userId: document.userId,
          followerUserId: document.followerUserId,
          id: id.value
        })
      : null;
  }

  public async all(): Promise<Follower[]> {
    const collection = await this.collection();
    const documents = await collection.find<FollowerDocument>({}).toArray();

    return documents.map(document =>
      Follower.fromPrimitives({
        userId: document.userId,
        followerUserId: document.followerUserId,
        id: document._id
      })
    );
  }

  public async matching(criteria: Criteria): Promise<Follower[]> {
    const documents = await this.searchByCriteria<FollowerDocument>(criteria);

    return documents.map(document =>
      Follower.fromPrimitives({
        userId: document.userId,
        followerUserId: document.followerUserId,
        id: document._id
      })
    );
  }

  public async delete(criteria: Criteria): Promise<void> {
    return this.deleteByCriteria(criteria);
  }
}
