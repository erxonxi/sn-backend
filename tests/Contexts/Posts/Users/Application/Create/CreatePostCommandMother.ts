import { CreatePostCommand } from '../../../../../../src/Contexts/Posts/Posts/Domain/Command/CreatePostCommand';
import { PostMessage } from '../../../../../../src/Contexts/Posts/Posts/Domain/PostMessage';
import { PostProfileName } from '../../../../../../src/Contexts/Posts/Posts/Domain/PostProfileName';
import { PostId } from '../../../../../../src/Contexts/Posts/Shared/Domain/Posts/PostId';
import { UserId } from '../../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../../Mooc/Shared/domain/UserIdMother';
import { PostIdMother } from '../../../Shared/domain/PostIdMother';
import { PostMessageMother } from '../../Domain/PostMessageMother';
import { PostProfileNameMother } from '../../Domain/PostProfileNameMother';

export class CreatePostCommandMother {
  static create(
    id: PostId,
    userId: UserId,
    profileName: PostProfileName,
    message: PostMessage
  ): CreatePostCommand {
    return {
      id: id.value,
      userId: userId.value,
      profileName: profileName.value,
      message: message.value
    };
  }

  static random(): CreatePostCommand {
    return this.create(
      PostIdMother.random(),
      UserIdMother.random(),
      PostProfileNameMother.random(),
      PostMessageMother.random()
    );
  }
}
