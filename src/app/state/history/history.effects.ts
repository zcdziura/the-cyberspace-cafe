import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { loadBanner, saveLines } from './history.actions';
import { HistoryService } from './history.service';

@Injectable()
export class HistoryEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly service: HistoryService
	) {}

	loadBannerFile$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadBanner),
			switchMap(() =>
				this.service.fetchBanner().pipe(
					map(lines => saveLines({ lines })),
					catchError(err => {
						console.error('Uh oh!', err);
						return EMPTY;
					})
				)
			)
		)
	);
}
