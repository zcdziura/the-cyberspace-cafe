import { createAction, props } from '@ngrx/store';

export const loadBanner = createAction('[History] Load Banner');

export const saveLines = createAction(
	'[History] Save Lines',
	props<{ lines: string[] }>()
);

export const saveLine = createAction(
	'[History] Save Line',
	props<{ line: string }>()
);
