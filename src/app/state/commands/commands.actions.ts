import { createAction, props } from '@ngrx/store';
import { Commands } from './commands.model';

export const defineCommands = createAction(
	'[Commands] Define Commands',
	props<{
		commands: Commands;
	}>()
);

export const processCurrentCommand = createAction(
	'[Prompt] Process Current Command'
);
