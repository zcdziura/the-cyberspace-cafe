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
import { CommandKeybinding } from './models/command-keybinding';
import {
	backspace,
	isCursorBlinking,
	keyPress,
} from './state/prompt/prompt.actions';
import { PromptState } from './state/prompt/prompt.model';

@Injectable()
export class AppService {
	private afterTypingDelay: Subscription = new Subscription();
	private readonly isDoneTyping$ = new Subject<void>();

	readonly keyPressEvents$ = fromEvent(document, 'keydown').pipe(
		tap(e => this.onKeyPress(e as KeyboardEvent)),
		skipUntil(this.isDoneTyping$)
	);

	constructor(private readonly store: Store<PromptState>) {}

	public onKeyPress($event: KeyboardEvent) {
		$event.preventDefault();

		this.controlCursor();
		this.store.dispatch(isCursorBlinking({ isCursorBlinking: false }));

		const key = $event.key;
		const isPrintable = key.length === 1;

		if (isPrintable) {
			this.store.dispatch(keyPress({ key }));
		} else {
			const command = this.mapCommandKeybinding(
				$event.key,
				$event.ctrlKey,
				$event.shiftKey,
				$event.altKey
			);

			if (command !== null) {
				this.dispatchCommand(command);
			}
		}
	}

	private controlCursor() {
		if (!this.afterTypingDelay.closed) {
			this.afterTypingDelay.unsubscribe();
		}

		this.afterTypingDelay = asyncScheduler.schedule(() => {
			this.isDoneTyping$.next();
			this.afterTypingDelay?.unsubscribe();
			this.store.dispatch(isCursorBlinking({ isCursorBlinking: true }));
		}, 500);
	}

	private dispatchCommand(command: CommandKeybinding) {
		switch (command) {
			case CommandKeybinding.Backspace:
				this.store.dispatch(backspace());
				break;
		}
	}

	private mapCommandKeybinding(
		key: string,
		isControl: boolean,
		isShift: boolean,
		isAlt: boolean
	): CommandKeybinding | null {
		switch (key.toLowerCase()) {
			case 'backspace':
				return CommandKeybinding.Backspace;

			default:
				return null;
		}
	}
}
