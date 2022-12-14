import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	asyncScheduler,
	forkJoin,
	fromEvent,
	map,
	skipUntil,
	Subject,
	Subscription,
	tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import * as YAML from 'yaml';
import {
	defineCommands,
	processCurrentCommand,
} from './state/commands/commands.actions';
import { Commands } from './state/commands/commands.model';
import { saveLines } from './state/history/history.actions';
import {
	backspace,
	isCursorBlinking,
	keyPress,
} from './state/prompt/prompt.actions';
import { PromptState } from './state/prompt/prompt.model';

@Injectable({ providedIn: 'root' })
export class AppService {
	private afterTypingDelay = new Subscription();
	private readonly isDoneTyping$ = new Subject<void>();

	staticAssetsSubscription = new Subscription();

	readonly keyPressEvents$ = fromEvent(document, 'keydown').pipe(
		tap(e => this.onKeyPress(e as KeyboardEvent)),
		skipUntil(this.isDoneTyping$)
	);

	constructor(
		private readonly http: HttpClient,
		private readonly store$: Store<PromptState>
	) {}

	public loadStaticAssetsFromServer() {
		this.staticAssetsSubscription = forkJoin([
			this.loadBanner(),
			this.loadCommands(),
		]).subscribe(actions =>
			actions.forEach(action => this.store$.dispatch(action))
		);
	}

	public onKeyPress($event: KeyboardEvent) {
		if (
			!(
				$event.key.toLowerCase() === 'i' &&
				$event.ctrlKey &&
				$event.shiftKey
			)
		) {
			$event.preventDefault();
		}

		this.setCursorStateResetter();
		this.store$.dispatch(isCursorBlinking({ isCursorBlinking: false }));

		const isPrintable = $event.key.length === 1;
		if (isPrintable) {
			this.store$.dispatch(keyPress({ key: $event.key }));
		} else {
			this.processCommand(
				$event.key,
				$event.ctrlKey,
				$event.shiftKey,
				$event.altKey
			);
		}
	}

	public unsubscribe() {
		this.staticAssetsSubscription.unsubscribe();
	}

	private loadBanner() {
		return this.http
			.get('/assets/banner.txt', { responseType: 'text' })
			.pipe(
				map(text => {
					const lastUpdated = `Last updated on: ${environment.buildTimeStamp}`;
					const welcomeMessage = `To get started, type in 'welcome'.`;

					return saveLines({
						lines: Array.of(
							...text.split('\n'),
							lastUpdated,
							welcomeMessage
						),
					});
				})
			);
	}

	private loadCommands() {
		return this.http
			.get('/assets/commands.yaml', { responseType: 'text' })
			.pipe(
				map(text => {
					const commands: Commands = YAML.parse(text);
					return defineCommands({ commands });
				})
			);
	}

	private setCursorStateResetter() {
		if (!this.afterTypingDelay.closed) {
			this.afterTypingDelay.unsubscribe();
		}

		this.afterTypingDelay = asyncScheduler.schedule(() => {
			this.isDoneTyping$.next();
			this.afterTypingDelay?.unsubscribe();
			this.store$.dispatch(isCursorBlinking({ isCursorBlinking: true }));
		}, 500);
	}

	private processCommand(
		key: string,
		isCtrl: boolean,
		isShift: boolean,
		isAlt: boolean
	) {
		switch (key.toLowerCase()) {
			case 'backspace':
				this.store$.dispatch(backspace());
				break;

			case 'enter':
				this.store$.dispatch(processCurrentCommand());
				break;

			default:
				return;
		}
	}
}
