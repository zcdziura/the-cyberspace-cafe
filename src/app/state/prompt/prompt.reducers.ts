import { createReducer, on } from '@ngrx/store';
import { backspace, clear, isCursorBlinking, keyPress } from './prompt.actions';
import { PromptMode, PromptState } from './prompt.model';

export const promptStateFeatureName = 'prompt';

export const initialState: PromptState = {
	stdin: '',
	isCursorBlinking: true,
	mode: PromptMode.Stdin,
};

export const promptStateReducers = createReducer(
	initialState,
	on(keyPress, (state, { key }) => ({
		...state,
		stdin: state.stdin + key,
	})),
	on(clear, state => ({
		...state,
		stdin: '',
	})),
	on(backspace, state => ({
		...state,
		stdin:
			state.stdin.length === 0
				? state.stdin
				: state.stdin.substring(0, state.stdin.length - 1),
	})),
	on(isCursorBlinking, (state, { isCursorBlinking }) => ({
		...state,
		isCursorBlinking,
	}))
);
