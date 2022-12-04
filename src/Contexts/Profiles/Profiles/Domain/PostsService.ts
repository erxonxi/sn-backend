import { Post } from '../../../Posts/Posts/Domain/Post';
import { UserId } from '../../../Shared/Domain/Users/UserId';

export interface PostsService {
  getUserPosts(id: UserId): Promise<Post[]>;
}
