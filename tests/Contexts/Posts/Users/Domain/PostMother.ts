import { CreatePostCommand } from '../../../../../src/Contexts/Posts/Posts/Domain/Command/CreatePostCommand';
import { Post } from '../../../../../src/Contexts/Posts/Posts/Domain/Post';
import { PostMessage } from '../../../../../src/Contexts/Posts/Posts/Domain/PostMessage';
import { PostProfileName } from '../../../../../src/Contexts/Posts/Posts/Domain/PostProfileName';
import { PostId } from '../../../../../src/Contexts/Posts/Shared/Domain/Posts/PostId';
import { UserId } from '../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../Mooc/Shared/domain/UserIdMother';
import { PostIdMother } from '../../Shared/domain/PostIdMother';
import { PostMessageMother } from './PostMessageMother';
import { PostProfileNameMother } from './PostProfileNameMother';

export class PostMother {
  static create(
    id: PostId,
    userId: UserId,
    profileName: PostProfileName,
    message: PostMessage
  ): Post {
    return new Post(id, userId, profileName, message);
  }

  static from(command: CreatePostCommand): Post {
    return this.create(
      PostIdMother.create(command.id),
      UserIdMother.create(command.userId),
      PostProfileNameMother.create(command.profileName),
      PostMessageMother.create(command.message)
    );
  }

  static random(): Post {
    return this.create(
      PostIdMother.random(),
      UserIdMother.random(),
      PostProfileNameMother.random(),
      PostMessageMother.random()
    );
  }
}

export class PostBuilder {
  constructor(
    private id: PostId,
    private userId: UserId,
    private profileName: PostProfileName,
    private message: PostMessage,
    private createdAt?: Date
  ) {}

  withId(id: PostId): PostBuilder {
    this.id = id;
    return this;
  }

  withUserId(userId: UserId): PostBuilder {
    this.userId = userId;
    return this;
  }

  withMessage(message: PostMessage): PostBuilder {
    this.message = message;
    return this;
  }

  withCreatedAt(createdAt: Date): PostBuilder {
    this.createdAt = createdAt;
    return this;
  }

  build(): Post {
    return new Post(this.id, this.userId, this.profileName, this.message, this.createdAt);
  }

  static random(): PostBuilder {
    return new PostBuilder(
      PostIdMother.random(),
      UserIdMother.random(),
      PostProfileNameMother.random(),
      PostMessageMother.random()
    );
  }
}
