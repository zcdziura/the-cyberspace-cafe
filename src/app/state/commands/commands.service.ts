import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommandsState } from './commands.model';

@Injectable()
export class CommandsService {
	constructor(private readonly store$: Store<CommandsState>) {}

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
		console.log(stdin);
	}
}
