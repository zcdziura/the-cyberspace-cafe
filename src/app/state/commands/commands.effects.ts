import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs';
import { saveLine } from '../history/history.actions';
import { clear, switchMode } from '../prompt/prompt.actions';
import { PromptMode, PromptState } from '../prompt/prompt.model';
import {
	selectCurrentPromptMode,
	selectStdin,
} from '../prompt/prompt.selectors';
import { processCurrentCommand } from './commands.actions';
import { CommandsState } from './commands.model';
import { selectCommandIfExists } from './commands.selectors';
import { CommandsService } from './commands.service';

@Injectable()
export class CommandsEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store<CommandsState | PromptState>,
		private readonly service: CommandsService
	) {}

	processCurrentCommand$ = createEffect(() =>
		this.actions$.pipe(
			ofType(processCurrentCommand),
			withLatestFrom(
				this.store$.select(selectStdin),
				this.store$.select(selectCurrentPromptMode)
			),
			map(([_, stdin, currentPromptMode]) => [stdin, currentPromptMode]),
			tap(([stdin, currentPromptMode]) => {
				this.store$.dispatch(saveLine({ line: stdin }));

				if (currentPromptMode === PromptMode.Stdin) {
					this.store$.dispatch(
						switchMode({ mode: PromptMode.Command })
					);
				}
			}),
			map(([stdin]) => this.service.splitCommandAndArguments(stdin)),
			mergeMap(([command, ...args]) =>
				this.store$
					.select(selectCommandIfExists(command))
					.pipe(catchError(err => [err]))
			),
			tap(stdin => this.service.processStdin(stdin)),
			map(() => clear())
		)
	);
}
