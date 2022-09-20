import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, first, map, switchMap, withLatestFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PromptMode, PromptState } from '../prompt/prompt.model';
import {
	selectCurrentPromptMode,
	selectStdin,
} from '../prompt/prompt.selectors';
import {
	addCurrentStdinToHistory,
	loadStaticAssetsFromServer,
	saveLine,
	saveLines,
} from './history.actions';
import { HistoryService } from './history.service';

@Injectable()
export class HistoryEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store<PromptState>,
		private readonly service: HistoryService
	) {}

	addCurrentStdinToHistory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(addCurrentStdinToHistory),
			switchMap(() =>
				this.store$
					.select(selectStdin)
					.pipe(
						first(),
						withLatestFrom(
							this.store$.select(selectCurrentPromptMode)
						)
					)
			),
			map(([stdin, promptMode]) => {
				let line = stdin;
				if (promptMode === PromptMode.Stdin) {
					line = `▶ ${line}`;
				}

				return line;
			}),
			map(line => saveLine({ line }))
		)
	);

	loadStaticAssetsFromServer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadStaticAssetsFromServer),
			switchMap(() =>
				this.service.fetchBanner().pipe(
					map(lines => {
						const buildTimeStamp = environment.buildTimeStamp;
						const lastUpdated = `Last updated on: ${buildTimeStamp}`;
						const welcomeMessage = `To get started, type in 'welcome'.`;

						return saveLines({
							lines: lines.concat([lastUpdated, welcomeMessage]),
						});
					}),
					catchError(err => {
						console.error('Uh oh!', err);
						return EMPTY;
					})
				)
			)
		)
	);
}
