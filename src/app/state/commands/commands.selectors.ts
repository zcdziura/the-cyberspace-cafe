import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommandsState } from './commands.model';
import { commandsStateFeatureName } from './commands.reducers';

const featureSelector = createFeatureSelector<CommandsState>(
	commandsStateFeatureName
);

export const selectWelcomeCommand = createSelector(
	featureSelector,
	state => state.welcome
);
