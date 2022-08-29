import { createReducer, on } from '@ngrx/store';
import { isBlinking } from './cursor.actions';
import { CursorState } from './cursor.model';

export const cursorStateFeatureName = 'cursor';

export const initialState: CursorState = {
	isBlinking: true,
};

export const cursorStateReducers = createReducer(
	initialState,
	on(isBlinking, (state, { isBlinking }) => ({
		...state,
		isBlinking,
	}))
);
