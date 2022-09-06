import { createAction, props } from '@ngrx/store';
import { PromptMode } from './prompt.model';

export const keyPress = createAction(
	'[Prompt] Key Press',
	props<{ key: string }>()
);

export const clear = createAction('[Prompt] Clear');

export const backspace = createAction('[Prompt] Backspace');

export const isCursorBlinking = createAction(
	'[Prompt] Is Cursor Blinking',
	props<{ isCursorBlinking: boolean }>()
);

export const processCurrentCommand = createAction(
	'[Prompt] Process Current Command'
);

export const addCommandToHistory = createAction(
	'[Prompt] Add Command to History'
);

export const switchMode = createAction(
	'[Prompt] Switch Mode',
	props<{ mode: PromptMode }>()
);
