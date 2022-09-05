import { Command } from './command';

export class WelcomeCommand extends Command<void> {
	constructor() {
		super('welcome');
	}
}
