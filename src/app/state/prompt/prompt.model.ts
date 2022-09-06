export interface PromptState {
	stdin: string;
	isCursorBlinking: boolean;
	mode: PromptMode;
}

export enum PromptMode {
	Command = 'Command',
	Stdin = 'Stdin',
}
