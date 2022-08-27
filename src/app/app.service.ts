import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommandKeybinding } from './models/command-keybinding';
import { backspace, keyPress } from './state/command/command.actions';
import { CommandState } from './state/command/command.model';

@Injectable()
export class AppService {
	constructor(private readonly store: Store<CommandState>) {}

	public onKeyPress($event: KeyboardEvent) {
		$event.preventDefault();

		const key = $event.key;
		const isPrintable = key.length === 1;
		console.log($event);

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
