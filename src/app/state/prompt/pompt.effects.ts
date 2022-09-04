import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { processCurrentCommand } from './prompt.actions';
import { PromptState } from './prompt.model';
import { selectCommand } from './prompt.selectors';

@Injectable()
export class PromptEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store$: Store<PromptState>,
		private readonly appService: AppService
	) {}

	processCommand$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(processCurrentCommand),
				switchMap(() => this.store$.select(selectCommand)),
				tap(console.log)
			),
		{ dispatch: false }
	);
}
