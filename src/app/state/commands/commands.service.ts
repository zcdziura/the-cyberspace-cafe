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
		const lines = stdin
			.map(line => {
				let words = line.split(' ');
				let buffer: string[][] = [];
				let lineLength = 0;
				let idx = 0;

				while (words.length > 0 && !!words[idx]) {
					const word = words[idx];
					lineLength += word.length + 1;
					idx += 1;

					if (lineLength >= 85) {
						buffer.push(words.slice(0, idx));
						words = words.slice(idx);
						idx = 0;
						lineLength = 0;
					}
				}

				if (words.length > 0) {
					buffer.push(words);
				}

				return buffer.flatMap(line => line.join(' '));
			})
			.flat();

		this.store$.dispatch(saveLines({ lines }));
		this.store$.dispatch(switchMode({ mode: PromptMode.Stdin }));
	}
}
