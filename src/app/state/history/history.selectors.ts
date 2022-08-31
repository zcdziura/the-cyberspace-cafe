import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HistoryState } from './history.model';
import { historyStateFeatureName } from './history.reducers';

const featureSelector = createFeatureSelector<HistoryState>(
	historyStateFeatureName
);

export const selectLines = createSelector(featureSelector, state =>
	state.lines.join('\n')
);
