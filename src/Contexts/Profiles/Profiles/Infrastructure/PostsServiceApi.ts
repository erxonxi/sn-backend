import { Post } from '../../../Posts/Posts/Domain/Post';
import { UserId } from '../../../Shared/Domain/Users/UserId';
import profilesConfig from '../../Shared/Infrastructure/config';
import { PostsService } from '../Domain/PostsService';

export class PostsServiceApi implements PostsService {
  async getUserPosts(id: UserId): Promise<Post[]> {
    const URL = profilesConfig.get('posts_service.url');
    const response = await fetch(`${URL}/v1/posts/users/${id.toString()}`);
    
    if (!response.ok) {
      throw new Error('PostsServiceApi error fetching data');
    }

    const postsPrimitives: any[] = await response.json();
    return postsPrimitives.map(p => Post.fromPrimitives(p));
  }
}
