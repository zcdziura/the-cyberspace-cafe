import { createAction, props } from '@ngrx/store';

export const loadBanner = createAction('[History] Load Banner');

export const saveLines = createAction(
	'[History] Save Lines',
	props<{ lines: string[] }>()
);
