import { Command } from '../../../../Shared/Domain/Command';
import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { CreateUserCommand } from '../../Domain/Commands/CreateUserCommand';
import { UserEmail } from '../../Domain/UserEmail';
import { UserPassword } from '../../Domain/UserPassword';
import { CreateUser } from './CreateUser';

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(private createUser: CreateUser) {}

  subscribedTo(): Command {
    return CreateUserCommand;
  }

  async handle(command: CreateUserCommand): Promise<void> {
    const id = new UserId(command.id);
    const email = new UserEmail(command.email);
    const password = new UserPassword(command.password);
    await this.createUser.run({ id, email, password });
  }
}
