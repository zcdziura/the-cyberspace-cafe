import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
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
					map(lines => {
						const buildTimeStamp = environment.buildTimeStamp;
						const lastUpdated = `Last updated on: ${buildTimeStamp}`;
						const welcomeMessage = `If you're a new patron to the cafe, type in 'welcome'.`;

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
