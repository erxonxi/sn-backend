import { PostCreatedDomainEvent } from '../../../../Posts/Posts/Domain/Events/PostCreatedDomainEvent';
import { Post } from '../../../../Posts/Posts/Domain/Post';
import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/Domain/DomainEventSubscriber';
import { InsertPost } from './InsertPost';

export class InsertPostOnPostCreated implements DomainEventSubscriber<PostCreatedDomainEvent> {
  constructor(private insertPost: InsertPost) {}

  subscribedTo(): DomainEventClass[] {
    return [PostCreatedDomainEvent];
  }

  async on(domainEvent: PostCreatedDomainEvent): Promise<void> {
    const post = Post.fromPrimitives({
      id: domainEvent.aggregateId,
      userId: domainEvent.userId,
      message: domainEvent.message,
      profileName: domainEvent.profileName
    });

    this.insertPost.execute({ post });
  }
}
