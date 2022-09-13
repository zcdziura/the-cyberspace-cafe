import { createReducer, on } from '@ngrx/store';
import { defineCommands } from './commands.actions';
import { CommandsState } from './commands.model';

export const commandsStateFeatureName = 'commands';

export const initialState: CommandsState = {
	currentCommand: null,
	commands: {},
};

export const commandsStateReducers = createReducer(
	initialState,
	on(defineCommands, (state, { commands }) => ({
		...state,
		commands,
	}))
);
