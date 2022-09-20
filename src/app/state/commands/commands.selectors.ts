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

export const selectCommandIfExists = (command: string) =>
	createSelector(featureSelector, selectAllCommands, (_, commands) => {
		if (!!commands[command]) {
			return commands[command];
		} else {
			throw new Error(
				`Command not found: "${command}". For a list of all commands, type \`help\`.`
			);
		}
	});

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
