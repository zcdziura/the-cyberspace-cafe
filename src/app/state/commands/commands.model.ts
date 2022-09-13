export interface CommandsState {
	currentCommand: string | null;
	commands: {
		[commandName: string]: (string | { prompt: string })[];
	};
}
