import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from './app.service';
import { CommandState } from './state/command/command.model';
import { selectCommand } from './state/command/command.selectors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [AppService],
})
export class AppComponent {
	public readonly command$ = this.store.select(selectCommand);

	constructor(
		private readonly store: Store<CommandState>,
		private readonly service: AppService
	) {}

	@HostListener('document:keydown', ['$event'])
	onKeyPress($event: KeyboardEvent) {
		$event.preventDefault();
		this.service.onKeyPress($event.key);
	}
}
