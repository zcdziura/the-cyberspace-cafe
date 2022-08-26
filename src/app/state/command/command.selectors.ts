import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommandState } from './command.model';
import { commandFeatureName } from './command.reducers';

const featureSelector = createFeatureSelector<CommandState>(commandFeatureName);

export const selectCommand = createSelector(
	featureSelector,
	state => state.command
);
