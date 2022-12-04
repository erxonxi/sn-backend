import { Document } from 'mongodb';
import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { UserId } from '../../../Shared/Domain/Users/UserId';
import { MongoRepository } from '../../../Shared/Infrastructure/persistence/mongo/MongoRepository';
import { User } from '../Domain/User';
import { UserRepository } from '../Domain/UserRepository';

interface UserDocument extends Document {
  _id: string;
  email: string;
  password: string;
}

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  public save(user: User): Promise<void> {
    return this.persist(user.id.value, user);
  }

  public async search(id: UserId): Promise<Nullable<User>> {
    const collection = await this.collection();
    const document = await collection.findOne<UserDocument>({ _id: id.value });

    return document
      ? User.fromPrimitives({ email: document.email, password: document.password, id: id.value })
      : null;
  }

  protected collectionName(): string {
    return 'users';
  }

  public async all(): Promise<User[]> {
    const collection = await this.collection();
    const documents = await collection.find<UserDocument>({}).toArray();

    return documents.map(document =>
      User.fromPrimitives({ email: document.email, password: document.password, id: document._id })
    );
  }

  public async matching(criteria: Criteria): Promise<User[]> {
    const documents = await this.searchByCriteria<UserDocument>(criteria);

    return documents.map(document =>
      User.fromPrimitives({ email: document.email, password: document.password, id: document._id })
    );
  }
}
