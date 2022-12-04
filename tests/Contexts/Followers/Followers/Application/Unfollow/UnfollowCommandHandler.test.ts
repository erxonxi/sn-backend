import { Unfollow } from '../../../../../../src/Contexts/Followers/Followers/Application/Unfollow/Unfollow';
import { UnfollowCommandHandler } from '../../../../../../src/Contexts/Followers/Followers/Application/Unfollow/UnfollowCommandHandler';
import EventBusMock from '../../../../Shared/domain/EventBusMock';
import { FollowerDeletedDomainEventMother } from '../../Domain/FollowerDeletedDomainEventMother';
import { FollowerMother } from '../../Domain/FollowerMother';
import { FollowerRepositoryMock } from '../../_Mocks_/FollowerRepositoryMock';
import { UnfollowCommandMother } from './UnfollowCommandMother';

let repository: FollowerRepositoryMock;
let service: Unfollow;
let eventBus: EventBusMock;
let handler: UnfollowCommandHandler;

beforeEach(() => {
  repository = new FollowerRepositoryMock();
  eventBus = new EventBusMock();
  service = new Unfollow(repository, eventBus);
  handler = new UnfollowCommandHandler(service);
});

describe('UnfollowCommandHandler', () => {
  it('should create a valid follower', async () => {
    const command = UnfollowCommandMother.random();
    const follower = FollowerMother.fromUnfollowCommand(command);
    const domainEvent = FollowerDeletedDomainEventMother.fromFollower(follower);
    repository.save(follower);

    await handler.handle(command);

    repository.assertDeleteHaveBeenCalled();
    eventBus.assertLastPublishedEventIs(domainEvent);
  });
});
