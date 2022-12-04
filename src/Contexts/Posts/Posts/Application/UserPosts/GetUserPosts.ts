import { Primitives } from '../../../../Shared/Domain/Primitives';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { UserPostsCriteria } from '../../Domain/Criteria/UserPostsCriteria';
import { Post } from '../../Domain/Post';
import { PostsRepository } from '../../Domain/PostsRepository';

export class GetUserPosts {
  constructor(private repository: PostsRepository) {}

  async execute(userId: UserId): Promise<Primitives<Post>[]> {
    const posts = await this.repository.matching(new UserPostsCriteria(userId));

    return posts.map(p => p.toPrimitives());
  }
}
