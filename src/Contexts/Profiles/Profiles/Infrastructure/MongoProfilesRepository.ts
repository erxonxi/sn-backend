import { Document } from 'mongodb';
import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { MongoRepository } from '../../../Shared/Infrastructure/persistence/mongo/MongoRepository';
import { ProfileId } from '../../Shared/Domain/Profiles/ProfileId';
import { Profile } from '../Domain/Profile';
import { ProfilesRepository } from '../Domain/ProfilesRepository';

interface ProfileDocument extends Document {
  _id: string;
  userId: string;
  name: string;
  followeds?: number;
  followers?: number;
}

export class MongoProfilesRepository
  extends MongoRepository<Profile>
  implements ProfilesRepository
{
  protected collectionName(): string {
    return 'profiles';
  }

  public save(user: Profile): Promise<void> {
    return this.persist(user.id.value, user);
  }

  public async search(id: ProfileId): Promise<Nullable<Profile>> {
    const collection = await this.collection();
    const document = await collection.findOne<ProfileDocument>({ _id: id.value });

    return document
      ? Profile.fromPrimitives({
          userId: document.userId,
          name: document.name,
          id: document._id,
          followeds: document.followeds || 0,
          followers: document.followers || 0
        })
      : null;
  }

  public async all(): Promise<Profile[]> {
    const collection = await this.collection();
    const documents = await collection.find<ProfileDocument>({}).toArray();

    return documents.map(document =>
      Profile.fromPrimitives({
        userId: document.userId,
        name: document.name,
        id: document._id,
        followeds: document.followeds || 0,
        followers: document.followers || 0
      })
    );
  }

  public async matching(criteria: Criteria): Promise<Profile[]> {
    const documents = await this.searchByCriteria<ProfileDocument>(criteria);

    return documents.map(document =>
      Profile.fromPrimitives({
        userId: document.userId,
        name: document.name,
        id: document._id,
        followeds: document.followeds || 0,
        followers: document.followers || 0
      })
    );
  }

  public async delete(criteria: Criteria): Promise<void> {
    return this.deleteByCriteria(criteria);
  }
}
