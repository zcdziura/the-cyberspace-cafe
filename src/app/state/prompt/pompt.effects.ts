import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { saveLine } from '../history/history.actions';
import { clear, processCurrentCommand } from './prompt.actions';
import { PromptState } from './prompt.model';
import { selectCommand } from './prompt.selectors';

@Injectable()
export class PromptEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store<PromptState>,
		private readonly appService: AppService
	) {}

	processCommand$ = createEffect(() =>
		this.actions$.pipe(
			ofType(processCurrentCommand),
			withLatestFrom(this.store$.select(selectCommand)),
			tap(([_, line]) => {
				this.store$.dispatch(saveLine({ line }));
				this.appService.processCommand(line.split(' '));
			}),
			switchMap(() => [clear()])
		)
	);
}
