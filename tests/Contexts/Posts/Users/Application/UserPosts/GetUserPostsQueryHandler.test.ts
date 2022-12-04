import { GetUserPosts } from '../../../../../../src/Contexts/Posts/Posts/Application/UserPosts/GetUserPosts';
import { GetUserPostsQueryHandler } from '../../../../../../src/Contexts/Posts/Posts/Application/UserPosts/GetUserPostsQueryHandler';
import { Post } from '../../../../../../src/Contexts/Posts/Posts/Domain/Post';
import { UserId } from '../../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../../Mooc/Shared/domain/UserIdMother';
import { PostBuilder, PostMother } from '../../Domain/PostMother';
import { PostsRepositoryMock } from '../../_Mocks_/PostsRepositoryMock';
import { GetUserPostsQueryMother } from './GetUserPostsQueryMother';

let repository: PostsRepositoryMock;
let service: GetUserPosts;
let handler: GetUserPostsQueryHandler;

let userId: UserId;
let posts: Post[];

beforeEach(() => {
  repository = new PostsRepositoryMock();
  service = new GetUserPosts(repository);
  handler = new GetUserPostsQueryHandler(service);

  userId = UserIdMother.random();
  posts = [
    PostMother.random(),
    PostMother.random(),
    PostMother.random(),
    PostMother.random(),
    PostMother.random(),
    PostBuilder.random().withUserId(userId).build(),
    PostBuilder.random().withUserId(userId).build(),
    PostBuilder.random().withUserId(userId).build(),
    PostBuilder.random().withUserId(userId).build(),
    PostBuilder.random().withUserId(userId).build()
  ];

  posts.map(async p => await repository.save(p));
});

describe('GetUserPostsQueryHandler', () => {
  it('should get user posts', async () => {
    const query = GetUserPostsQueryMother.create(userId);

    const res = await handler.handle(query);

    const expected = posts.filter(p => p.userId.value == userId.value).map(p => p.toPrimitives());
    expect(res).toEqual(expected);
  });
});
