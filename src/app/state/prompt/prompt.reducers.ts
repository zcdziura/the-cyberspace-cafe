import { createReducer, on } from '@ngrx/store';
import { backspace, isCursorBlinking, keyPress } from './prompt.actions';
import { PromptState } from './prompt.model';

export const promptStateFeatureName = 'prompt';

export const initialState: PromptState = {
	command: '',
	isCursorBlinking: true,
};

export const promptStateReducers = createReducer(
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
	})),
	on(isCursorBlinking, (state, { isCursorBlinking }) => ({
		...state,
		isCursorBlinking,
	}))
);
