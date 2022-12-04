import { CreatePost } from '../../../../../../src/Contexts/Posts/Posts/Application/Create/CreatePost';
import { CreatePostCommandHandler } from '../../../../../../src/Contexts/Posts/Posts/Application/Create/CreatePostCommandHandler';
import EventBusMock from '../../../../Shared/domain/EventBusMock';
import { PostCreatedDomainEventMother } from '../../Domain/PostCreatedDomainEventMother';
import { PostMother } from '../../Domain/PostMother';
import { PostsRepositoryMock } from '../../_Mocks_/PostsRepositoryMock';
import { CreatePostCommandMother } from './CreatePostCommandMother';

let repository: PostsRepositoryMock;
let service: CreatePost;
let eventBus: EventBusMock;
let handler: CreatePostCommandHandler;

beforeEach(() => {
  repository = new PostsRepositoryMock();
  eventBus = new EventBusMock();
  service = new CreatePost(repository, eventBus);
  handler = new CreatePostCommandHandler(service);
});

describe('CreatePostCommandHandler', () => {
  it('should create a valid user', async () => {
    const command = CreatePostCommandMother.random();
    const user = PostMother.from(command);
    const domainEvent = PostCreatedDomainEventMother.fromPost(user);

    await handler.handle(command);

    repository.assertSaveHaveBeenCalled();
    eventBus.assertLastPublishedEventIs(domainEvent);
  });
});
