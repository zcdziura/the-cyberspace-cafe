import { createReducer, on } from '@ngrx/store';
import { backspace, keyPress } from './command.actions';
import { CommandState } from './command.model';

export const commandFeatureName = 'command';

export const initialState: CommandState = {
	command: '',
};

export const commandReducers = createReducer(
	initialState,
	on(keyPress, (state, { key }) => ({
		...state,
		command: state.command + key,
	})),
	on(backspace, state => ({
		...state,
		command:
			state.command.length === 0
				? state.command
				: state.command.substring(0, state.command.length - 1),
	}))
);
