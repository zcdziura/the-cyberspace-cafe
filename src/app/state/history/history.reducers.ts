import { createReducer, on } from '@ngrx/store';
import { saveLines } from './history.actions';
import { HistoryState } from './history.model';

export const historyStateFeatureName = 'history';

export const initialState: HistoryState = {
	lines: [],
};

export const historyStateReducers = createReducer(
	initialState,
	on(saveLines, (state, { lines }) => ({
		...state,
		lines,
	}))
);
