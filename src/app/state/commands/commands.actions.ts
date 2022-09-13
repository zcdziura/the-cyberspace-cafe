import { createAction, props } from '@ngrx/store';
import { CommandsState } from './commands.model';

export const defineCommands = createAction(
	'[Commands] Define Commands',
	props<{ commands: CommandsState }>()
);
