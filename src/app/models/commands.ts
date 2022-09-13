export interface Commands {
	welcome: (string | CommandInput)[];
}

export interface CommandInput {
	prompt: string;
}
