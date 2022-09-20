import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommandsEffects } from './commands.effects';
import {
	commandsStateFeatureName,
	commandsStateReducers,
} from './commands.reducers';
import { CommandsService } from './commands.service';

@NgModule({
	imports: [
		EffectsModule.forFeature([CommandsEffects]),
		StoreModule.forFeature(commandsStateFeatureName, commandsStateReducers),
	],
	providers: [CommandsService],
})
export class CommandsStateModule {}
