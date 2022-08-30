import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PromptState } from './prompt.model';
import { promptStateFeatureName } from './prompt.reducers';

const featureSelector = createFeatureSelector<PromptState>(
	promptStateFeatureName
);

export const selectCommand = createSelector(
	featureSelector,
	state => state.command
);

export const selectIsCursorBlinking = createSelector(
	featureSelector,
	state => state.isCursorBlinking
);
