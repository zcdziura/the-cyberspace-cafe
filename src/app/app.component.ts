import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { PromptState } from './state/prompt/prompt.model';
import {
	selectCommand,
	selectIsCursorBlinking,
} from './state/prompt/prompt.selectors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [AppService],
})
export class AppComponent implements OnInit, OnDestroy {
	private keyPressEventsSubscription!: Subscription;

	public readonly command$ = this.store.select(selectCommand);
	public readonly isCursorBlinking$ = this.store.select(
		selectIsCursorBlinking
	);

	constructor(
		private readonly store: Store<PromptState>,
		private readonly service: AppService
	) {}

	ngOnInit(): void {
		this.keyPressEventsSubscription =
			this.service.keyPressEvents$.subscribe();
	}

	ngOnDestroy(): void {
		this.keyPressEventsSubscription.unsubscribe();
	}
}
