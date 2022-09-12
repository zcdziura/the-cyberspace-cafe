import { createAction, props } from '@ngrx/store';

export const loadStaticAssetsFromServer = createAction(
	'[History] Load Static Assets from Server'
);

export const saveLines = createAction(
	'[History] Save Lines',
	props<{ lines: string[] }>()
);

export const saveLine = createAction(
	'[History] Save Line',
	props<{ line: string }>()
);
