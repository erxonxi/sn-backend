import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { PostId } from '../../Shared/Domain/Posts/PostId';
import { Post } from './Post';

export interface PostsRepository {
  save(user: Post): Promise<void>;
  search(id: PostId): Promise<Nullable<Post>>;
  all(): Promise<Array<Post>>;
  delete(criteria: Criteria): Promise<void>;
  matching(criteria: Criteria): Promise<Array<Post>>;
}
