import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs';
import { addCurrentStdinToHistory } from '../history/history.actions';
import { clear, switchMode } from '../prompt/prompt.actions';
import { PromptMode, PromptState } from '../prompt/prompt.model';
import {
	selectCurrentPromptMode,
	selectStdin,
} from '../prompt/prompt.selectors';
import { processCurrentCommand } from './commands.actions';
import { CommandsService } from './commands.service';

@Injectable()
export class CommandsEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store<PromptState>,
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
			tap(([_, currentPromptMode]) => {
				if (currentPromptMode === PromptMode.Stdin) {
					this.store$.dispatch(
						switchMode({ mode: PromptMode.Command })
					);
				}
			}),
			tap(() => this.store$.dispatch(addCurrentStdinToHistory())),
			map(([stdin]) => this.service.splitCommandAndArguments(stdin)),
			tap(stdin => this.service.processStdin(stdin)),
			map(() => clear())
		)
	);
}
