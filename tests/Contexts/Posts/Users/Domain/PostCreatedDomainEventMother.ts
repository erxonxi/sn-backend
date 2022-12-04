import { PostCreatedDomainEvent } from '../../../../../src/Contexts/Posts/Posts/Domain/Events/PostCreatedDomainEvent';
import { Post } from '../../../../../src/Contexts/Posts/Posts/Domain/Post';

export class PostCreatedDomainEventMother {
  static create({
    aggregateId,
    eventId,
    userId,
    profileName,
    message,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    userId: string;
    profileName: string;
    message: string;
    occurredOn?: Date;
  }): PostCreatedDomainEvent {
    return new PostCreatedDomainEvent({
      aggregateId,
      eventId,
      userId,
      profileName,
      message,
      occurredOn
    });
  }

  static fromPost(post: Post): PostCreatedDomainEvent {
    return new PostCreatedDomainEvent({
      aggregateId: post.id.value,
      userId: post.userId.value,
      message: post.message.value,
      profileName: post.profileName.value
    });
  }
}
