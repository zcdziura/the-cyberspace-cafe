import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { HistoryState } from './state/history/history.model';
import { selectLines } from './state/history/history.selectors';
import { PromptState } from './state/prompt/prompt.model';
import {
	selectCommand,
	selectCurrentPromptMode,
	selectIsCursorBlinking,
} from './state/prompt/prompt.selectors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	private keyPressEventsSubscription!: Subscription;

	public readonly history$ = this.store$.select(selectLines);
	public readonly command$ = this.store$.select(selectCommand);
	public readonly isCursorBlinking$ = this.store$.select(
		selectIsCursorBlinking
	);
	public readonly currentPromptMode$ = this.store$.select(
		selectCurrentPromptMode
	);

	constructor(
		private readonly store$: Store<HistoryState | PromptState>,
		private readonly service: AppService
	) {}

	ngOnInit(): void {
		this.keyPressEventsSubscription =
			this.service.keyPressEvents$.subscribe();

		this.service.loadStaticAssetsFromServer();
	}

	ngOnDestroy(): void {
		this.keyPressEventsSubscription.unsubscribe();
		this.service.unsubscribe();
	}
}
