import { createAction, props } from '@ngrx/store';

export const isBlinking = createAction(
	'[Cursor] Is Blinking',
	props<{ isBlinking: boolean }>()
);
