import { Command } from '../../../../Shared/Domain/Command';

export class CreatePostCommand extends Command {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly profileName: string,
    public readonly message: string
  ) {
    super();
  }
}
