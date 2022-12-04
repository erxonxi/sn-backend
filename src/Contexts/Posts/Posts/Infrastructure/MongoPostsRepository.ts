import { Document } from 'mongodb';
import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { MongoRepository } from '../../../Shared/Infrastructure/persistence/mongo/MongoRepository';
import { PostId } from '../../Shared/Domain/Posts/PostId';
import { Post } from '../Domain/Post';
import { PostsRepository } from '../Domain/PostsRepository';

interface PostDocument extends Document {
  _id: string;
  userId: string;
  profileName: string;
  message: string;
  createdAt: string;
}

export class MongoPostsRepository extends MongoRepository<Post> implements PostsRepository {
  protected collectionName(): string {
    return 'posts';
  }

  public save(user: Post): Promise<void> {
    return this.persist(user.id.value, user);
  }

  public async search(id: PostId): Promise<Nullable<Post>> {
    const collection = await this.collection();
    const document = await collection.findOne<PostDocument>({ _id: id.value });

    return document
      ? Post.fromPrimitives({
          userId: document.userId,
          message: document.message,
          createdAt: document.createdAt,
          profileName: document.profileName,
          id: id.value
        })
      : null;
  }

  public async all(): Promise<Post[]> {
    const collection = await this.collection();
    const documents = await collection.find<PostDocument>({}).toArray();

    return documents.map(document =>
      Post.fromPrimitives({
        userId: document.userId,
        message: document.message,
        createdAt: document.createdAt,
        profileName: document.profileName,
        id: document._id
      })
    );
  }

  public async matching(criteria: Criteria): Promise<Post[]> {
    const documents = await this.searchByCriteria<PostDocument>(criteria);

    return documents.map(document =>
      Post.fromPrimitives({
        userId: document.userId,
        message: document.message,
        createdAt: document.createdAt,
        profileName: document.profileName,
        id: document._id
      })
    );
  }

  public async delete(criteria: Criteria): Promise<void> {
    return this.deleteByCriteria(criteria);
  }
}
