import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommandsState } from './commands.model';
import { commandsStateFeatureName } from './commands.reducers';

const featureSelector = createFeatureSelector<CommandsState>(
	commandsStateFeatureName
);

export const selectAllCommands = createSelector(
	featureSelector,
	state => state.commands
);

export const selectCurrentCommand = createSelector(
	featureSelector,
	state => state.currentCommand
);

export const selectCurrentCommandPrompts = createSelector(
	featureSelector,
	selectAllCommands,
	selectCurrentCommand,
	(_, commands, currentCommand) => {
		if (currentCommand !== null && !!commands[currentCommand]) {
			return commands[currentCommand];
		} else {
			return null;
		}
	}
);
