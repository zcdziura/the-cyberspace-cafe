import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { keyPress } from './state/command/command.actions';
import { CommandState } from './state/command/command.model';

@Injectable()
export class AppService {
	constructor(private readonly store: Store<CommandState>) {}

	public onKeyPress(key: string) {
		const isPrintable = key.length === 1;
		if (isPrintable) {
			this.store.dispatch(keyPress({ key }));
		}
	}
}
