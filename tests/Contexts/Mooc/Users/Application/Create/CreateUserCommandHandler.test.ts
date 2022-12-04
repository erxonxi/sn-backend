import { CreateUser } from '../../../../../../src/Contexts/Mooc/Users/Application/Create/CreateUser';
import { CreateUserCommandHandler } from '../../../../../../src/Contexts/Mooc/Users/Application/Create/CreateUserCommandHandler';
import { InvalidArgumentError } from '../../../../../../src/Contexts/Shared/Domain/value-object/InvalidArgumentError';
import { HashEncrypt } from '../../../../../../src/Contexts/Shared/Infrastructure/Encrypt/HashEncrypt';
import EventBusMock from '../../../../Shared/domain/EventBusMock';
import { UserCreatedDomainEventMother } from '../../Domain/UserCreatedDomainEventMother';
import { UserMother } from '../../Domain/UserMother';
import { UserRepositoryMock } from '../../_Mocks_/UserRepositoryMock';
import { CreateUserCommandMother } from './CreateUserCommandMother';

let repository: UserRepositoryMock;
let service: CreateUser;
let eventBus: EventBusMock;
let encrypter: HashEncrypt;
let handler: CreateUserCommandHandler;

beforeEach(() => {
  repository = new UserRepositoryMock();
  eventBus = new EventBusMock();
  encrypter = new HashEncrypt();
  service = new CreateUser(repository, eventBus, encrypter);
  handler = new CreateUserCommandHandler(service);
});

describe('CreateUserCommandHandler', () => {
  it('should create a valid user', async () => {
    const command = CreateUserCommandMother.random();
    const user = UserMother.from(command);
    const domainEvent = UserCreatedDomainEventMother.fromUser(user);

    await handler.handle(command);

    repository.assertSaveHaveBeenCalled();
    eventBus.assertLastPublishedEventIs(domainEvent);
  });

  it('should throw a invalid user', async () => {
    const command = CreateUserCommandMother.invalid();
    await expect(() => handler.handle(command)).rejects.toThrow(InvalidArgumentError);
  });
});
