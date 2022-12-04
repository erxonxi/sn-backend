import { Command } from '../../../../../../src/Contexts/Shared/Domain/Command';

export class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}
