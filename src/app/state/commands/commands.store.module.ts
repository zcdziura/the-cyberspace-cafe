import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {
	commandsStateFeatureName,
	commandsStateReducers,
} from './commands.reducers';

@NgModule({
	imports: [
		StoreModule.forFeature(commandsStateFeatureName, commandsStateReducers),
	],
})
export class CommandsStateModule {}
