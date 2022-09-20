export interface CommandsState {
	currentCommand: string | null;
	commands: Commands;
}

export type Commands = {
	// [commandName: string]: (string | { prompt: string })[];
	[commandName: string]: string[];
};
