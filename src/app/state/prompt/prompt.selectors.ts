import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PromptState } from './prompt.model';
import { promptStateFeatureName } from './prompt.reducers';

const featureSelector = createFeatureSelector<PromptState>(
	promptStateFeatureName
);

export const selectCommand = createSelector(
	featureSelector,
	state => state.stdin
);

export const selectIsCursorBlinking = createSelector(
	featureSelector,
	state => state.isCursorBlinking
);

export const selectCurrentPromptMode = createSelector(
	featureSelector,
	state => state.mode
);
