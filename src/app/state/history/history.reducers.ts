import { createReducer, on } from '@ngrx/store';
import { saveLine, saveLines } from './history.actions';
import { HistoryState } from './history.model';

export const historyStateFeatureName = 'history';

export const initialState: HistoryState = {
	lines: [],
};

export const historyStateReducers = createReducer(
	initialState,
	on(saveLines, (state, { lines }) => ({
		...state,
		lines: state.lines.concat(lines).slice(-1000),
	})),
	on(saveLine, (state, { line }) => ({
		...state,
		lines: Array.of(...state.lines, `▶ ${line}`).slice(-1000),
	}))
);
