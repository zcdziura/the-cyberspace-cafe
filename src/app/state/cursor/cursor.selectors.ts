import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursorState } from './cursor.model';
import { cursorStateFeatureName } from './cursor.reducers';

const featureSelector = createFeatureSelector<CursorState>(
	cursorStateFeatureName
);

export const selectIsBlinking = createSelector(
	featureSelector,
	state => state.isBlinking
);
