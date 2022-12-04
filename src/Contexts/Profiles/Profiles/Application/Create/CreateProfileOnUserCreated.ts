import { UserCreatedDomainEvent } from '../../../../Mooc/Users/Domain/Events/UserCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/Domain/DomainEventSubscriber';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { ProfileId } from '../../../Shared/Domain/Profiles/ProfileId';
import { ProfileName } from '../../Domain/ProfileName';
import { CreateProfile } from './CreateProfile';

export class CreateProfileOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
  constructor(private createProfile: CreateProfile) {}

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }

  async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
    const params = {
      id: new ProfileId(ProfileId.random().toString()),
      userId: new UserId(domainEvent.aggregateId),
      name: new ProfileName(domainEvent.email)
    };

    this.createProfile.execute(params);
  }
}
