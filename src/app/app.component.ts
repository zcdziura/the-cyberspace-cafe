import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { CommandState } from './state/command/command.model';
import { selectCommand } from './state/command/command.selectors';
import { CursorState } from './state/cursor/cursor.model';
import { selectIsBlinking } from './state/cursor/cursor.selectors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [AppService],
})
export class AppComponent implements OnInit, OnDestroy {
	private keyPressEventsSubscription!: Subscription;

	public readonly command$ = this.store.select(selectCommand);
	public readonly isBlinking$ = this.store.select(selectIsBlinking);

	constructor(
		private readonly store: Store<CommandState | CursorState>,
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
