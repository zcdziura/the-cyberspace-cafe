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
import { Command } from './models/command/command';
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

		const key = $event.key;
		const isPrintable = key.length === 1;

		if (isPrintable) {
			this.store$.dispatch(keyPress({ key }));
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

	private mapCommandKeybinding(
		key: string,
		isControl: boolean,
		isShift: boolean,
		isAlt: boolean
	): CommandKeybinding | null {
		switch (key.toLowerCase()) {
			case 'backspace':
				return CommandKeybinding.Backspace;

			case 'enter':
				return CommandKeybinding.Enter;

			default:
				return null;
		}
	}

	private dispatchCommand(command: CommandKeybinding) {
		this.store$.dispatch(switchMode({ mode: PromptMode.Command }));

		switch (command) {
			case CommandKeybinding.Backspace:
				this.store$.dispatch(backspace());
				break;

			case CommandKeybinding.Enter:
				this.store$.dispatch(processCurrentCommand());
				break;

			default:
				break;
		}
	}
}
