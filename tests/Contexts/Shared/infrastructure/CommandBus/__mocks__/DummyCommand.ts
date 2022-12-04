import { Command } from '../../../../../../src/Contexts/Shared/Domain/Command';

export class DummyCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}
