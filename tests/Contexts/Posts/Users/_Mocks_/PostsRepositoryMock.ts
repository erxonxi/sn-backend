import { Post } from '../../../../../src/Contexts/Posts/Posts/Domain/Post';
import { PostsRepository } from '../../../../../src/Contexts/Posts/Posts/Domain/PostsRepository';
import { PostId } from '../../../../../src/Contexts/Posts/Shared/Domain/Posts/PostId';
import { Criteria } from '../../../../../src/Contexts/Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { ArrayCriteriaConverter } from '../../../Shared/domain/ArrayCriteriaConverter';

export class PostsRepositoryMock implements PostsRepository {
  private saveMock: jest.Mock;
  private searchAllMock: jest.Mock;
  private matchingMock: jest.Mock;
  private searchMock: jest.Mock;
  private posts: Array<Post> = [];
  private post: Nullable<Post> = null;

  constructor() {
    this.saveMock = jest.fn();
    this.searchAllMock = jest.fn();
    this.matchingMock = jest.fn();
    this.searchMock = jest.fn();
  }

  async delete(criteria: Criteria): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(post: Post): Promise<void> {
    this.saveMock(post);
    this.posts.push(post);
  }

  assertSaveHaveBeenCalledWith(expected: Post): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSaveHaveBeenCalled(): void {
    expect(this.saveMock).toHaveBeenCalled();
  }

  returnAll(posts: Array<Post>) {
    this.posts = posts;
  }

  returnMatching(posts: Array<Post>) {
    this.posts = posts;
  }

  assertAll() {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  async all(): Promise<Post[]> {
    this.searchAllMock();
    return this.posts;
  }

  async matching(criteria: Criteria): Promise<Post[]> {
    this.matchingMock(criteria);
    return ArrayCriteriaConverter.convert(this.posts, criteria);
  }

  async search(id: PostId): Promise<Nullable<Post>> {
    this.searchMock(id);
    return this.post;
  }
}
