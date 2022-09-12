import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	asyncScheduler,
	fromEvent,
	skipUntil,
	Subject,
	Subscription,
	tap,
} from 'rxjs';
import { loadBanner } from './state/history/history.actions';
import {
	backspace,
	isCursorBlinking,
	keyPress,
	processCurrentCommand,
	switchMode,
} from './state/prompt/prompt.actions';
import { PromptMode, PromptState } from './state/prompt/prompt.model';

@Injectable({ providedIn: 'root' })
export class AppService {
	private afterTypingDelay: Subscription = new Subscription();
	private readonly isDoneTyping$ = new Subject<void>();

	readonly keyPressEvents$ = fromEvent(document, 'keydown').pipe(
		tap(e => this.onKeyPress(e as KeyboardEvent)),
		skipUntil(this.isDoneTyping$)
	);

	constructor(private readonly store$: Store<PromptState>) {}

	public loadBanner() {
		this.store$.dispatch(loadBanner());
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

		this.setCursorState();
		this.store$.dispatch(isCursorBlinking({ isCursorBlinking: false }));

		const isPrintable = $event.key.length === 1;
		if (isPrintable) {
			this.store$.dispatch(keyPress({ key: $event.key }));
		} else {
			this.dispatchCommand(
				$event.key,
				$event.ctrlKey,
				$event.shiftKey,
				$event.altKey
			);
		}
	}

	public processCommand(command: string[]) {
		const commandName = command[0];
		switch (commandName.toLowerCase()) {
			case 'welcome':
				break;

			default:
				return;
		}
	}

	private setCursorState() {
		if (!this.afterTypingDelay.closed) {
			this.afterTypingDelay.unsubscribe();
		}

		this.afterTypingDelay = asyncScheduler.schedule(() => {
			this.isDoneTyping$.next();
			this.afterTypingDelay?.unsubscribe();
			this.store$.dispatch(isCursorBlinking({ isCursorBlinking: true }));
		}, 500);
	}

	private dispatchCommand(
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
				[
					switchMode({ mode: PromptMode.Command }),
					processCurrentCommand(),
				].forEach(action => this.store$.dispatch(action));
				break;

			default:
				return;
		}
	}
}
