import { GetFollowersOfUser } from '../../../../../../src/Contexts/Followers/Followers/Application/FollowersOfUser/GetFollowersOfUser';
import { GetFollowersOfUserQueryHandler } from '../../../../../../src/Contexts/Followers/Followers/Application/FollowersOfUser/GetFollowersOfUserQueryHandler';
import { Follower } from '../../../../../../src/Contexts/Followers/Followers/Domain/Follower';
import { UserId } from '../../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../../Mooc/Shared/domain/UserIdMother';
import { FollowerMother } from '../../Domain/FollowerMother';
import { FollowerRepositoryMock } from '../../_Mocks_/FollowerRepositoryMock';
import { GetFollowersOfUserQueryMother } from './GetFollowersOfUserQueryMother';

let repository: FollowerRepositoryMock;
let service: GetFollowersOfUser;
let handler: GetFollowersOfUserQueryHandler;

let userId: UserId;
let follows: Follower[];

beforeEach(() => {
  repository = new FollowerRepositoryMock();
  service = new GetFollowersOfUser(repository);
  handler = new GetFollowersOfUserQueryHandler(service);

  userId = UserIdMother.random();
  follows = [
    FollowerMother.random(),
    FollowerMother.random(),
    FollowerMother.random(),
    FollowerMother.random(),
    FollowerMother.random(),
    FollowerMother.withUserId(userId),
    FollowerMother.withUserId(userId),
    FollowerMother.withUserId(userId),
    FollowerMother.withUserId(userId),
    FollowerMother.withUserId(userId)
  ];

  follows.map(async p => await repository.save(p));
});

describe('GetFollowersOfUserQueryHandler', () => {
  it('should get user followers', async () => {
    const query = GetFollowersOfUserQueryMother.create(userId);

    const res = await handler.handle(query);

    const expected = follows.filter(p => p.userId.value == userId.value).map(p => p.toPrimitives());
    expect(res).toEqual(expected);
  });
});
