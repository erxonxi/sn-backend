import { Follow } from '../../../../../../src/Contexts/Followers/Followers/Application/Follow/Follow';
import { FollowCommandHandler } from '../../../../../../src/Contexts/Followers/Followers/Application/Follow/FollowCommandHandler';
import EventBusMock from '../../../../Shared/domain/EventBusMock';
import { FollowerCreatedDomainEventMother } from '../../Domain/FollowerCreatedDomainEventMother';
import { FollowerMother } from '../../Domain/FollowerMother';
import { FollowerRepositoryMock } from '../../_Mocks_/FollowerRepositoryMock';
import { MoocServiceMock } from '../../_Mocks_/MoocServiceMock';
import { FollowCommandMother } from './FollowCommandMother';

let repository: FollowerRepositoryMock;
let service: Follow;
let eventBus: EventBusMock;
let moocService: MoocServiceMock;
let handler: FollowCommandHandler;

beforeEach(() => {
  repository = new FollowerRepositoryMock();
  eventBus = new EventBusMock();
  moocService = new MoocServiceMock();
  service = new Follow(repository, eventBus, moocService);
  handler = new FollowCommandHandler(service);
});

describe('FollowCommandHandler', () => {
  it('should create a valid follower', async () => {
    const command = FollowCommandMother.random();
    const follower = FollowerMother.fromFollowCommand(command);
    const domainEvent = FollowerCreatedDomainEventMother.fromFollower(follower);

    await handler.handle(command);

    eventBus.assertLastPublishedEventIs(domainEvent);
  });
});
