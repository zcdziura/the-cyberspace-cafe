import { createAction, props } from '@ngrx/store';

export const keyPress = createAction(
	'[Prompt] Key Press',
	props<{ key: string }>()
);

export const backspace = createAction('[Prompt] Backspace');

export const isCursorBlinking = createAction(
	'[Prompt] Is Cursor Blinking',
	props<{ isCursorBlinking: boolean }>()
);

export const processCurrentCommand = createAction(
	'[Prompt] Process Current Command'
);
