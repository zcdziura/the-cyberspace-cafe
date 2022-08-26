import { createReducer, on } from '@ngrx/store';
import { keyPress } from './command.actions';
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
	}))
);
