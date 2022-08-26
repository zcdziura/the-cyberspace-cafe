import { createAction, props } from '@ngrx/store';

export const keyPress = createAction(
	'[Command] KeyPress',
	props<{ key: string }>()
);
