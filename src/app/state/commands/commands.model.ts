export interface CommandsState {
	welcome: (string[] | CommandInput)[];
}

export interface CommandInput {
	prompt: string;
}
