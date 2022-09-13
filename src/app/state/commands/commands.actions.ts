import { createAction, props } from '@ngrx/store';

export const defineCommands = createAction(
	'[Commands] Define Commands',
	props<{
		commands: { [commandName: string]: (string | { prompt: string })[] };
	}>()
);
