import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveLines } from '../history/history.actions';
import { HistoryState } from '../history/history.model';
import { switchMode } from '../prompt/prompt.actions';
import { PromptMode, PromptState } from '../prompt/prompt.model';
import { CommandsState } from './commands.model';

@Injectable()
export class CommandsService {
	constructor(
		private readonly store$: Store<
			CommandsState | HistoryState | PromptState
		>
	) {}

	splitCommandAndArguments(stdin: string) {
		const buffer: string[] = [];
		let arg: string = '';
		let quoteChar: string | null = null;

		stdin.split('').forEach(char => {
			if (quoteChar == null && (char === `'` || char === '"')) {
				quoteChar = char;
			} else if (quoteChar != null && (char === `'` || char === '"')) {
				buffer.push(`${arg.trim()}`);
				arg = '';
				quoteChar = null;
			} else if (
				(quoteChar == null && char !== ' ') ||
				quoteChar != null
			) {
				arg += char;
			} else if (char === ' ' && arg !== '') {
				buffer.push(`${arg.trim()}`);
				arg = '';
			}
		});

		if (arg !== '') {
			buffer.push(`${arg.trim()}`);
		}

		return buffer;
	}

	processStdin(stdin: string[]) {
		this.store$.dispatch(saveLines({ lines: stdin }));
		this.store$.dispatch(switchMode({ mode: PromptMode.Stdin }));
	}
}
