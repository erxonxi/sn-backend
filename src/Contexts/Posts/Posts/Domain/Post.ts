import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { UserId } from '../../../Shared/Domain/Users/UserId';
import { PostId } from '../../Shared/Domain/Posts/PostId';
import { PostCreatedDomainEvent } from './Events/PostCreatedDomainEvent';
import { PostMessage } from './PostMessage';
import { PostProfileName } from './PostProfileName';

export class Post extends AggregateRoot {
  id: PostId;
  userId: UserId;
  profileName: PostProfileName;
  message: PostMessage;
  createdAt: Date;

  constructor(
    id: PostId,
    userId: UserId,
    profileName: PostProfileName,
    message: PostMessage,
    createdAt?: Date
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.profileName = profileName;
    this.message = message;
    this.createdAt = createdAt || new Date();
  }

  static create(
    id: PostId,
    userId: UserId,
    profileName: PostProfileName,
    message: PostMessage
  ): Post {
    const user = new Post(id, userId, profileName, message);

    user.record(
      new PostCreatedDomainEvent({
        aggregateId: user.id.value,
        userId: user.userId.value,
        profileName: user.profileName.value,
        message: user.message.value
      })
    );

    return user;
  }

  static fromPrimitives(plainData: {
    id: string;
    userId: string;
    profileName: string;
    message: string;
    createdAt?: string;
  }): Post {
    return new Post(
      new PostId(plainData.id),
      new UserId(plainData.userId),
      new PostProfileName(plainData.profileName),
      new PostMessage(plainData.message),
      plainData.createdAt ? new Date(plainData.createdAt) : undefined
    );
  }

  toPrimitives(): Primitives<Post> {
    return {
      id: this.id.value,
      userId: this.userId.value,
      profileName: this.profileName.value,
      message: this.message.value,
      createdAt: this.createdAt.toISOString()
    };
  }
}
