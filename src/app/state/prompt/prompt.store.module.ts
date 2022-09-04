import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PromptEffects } from './pompt.effects';
import { promptStateFeatureName, promptStateReducers } from './prompt.reducers';

@NgModule({
	imports: [
		EffectsModule.forFeature([PromptEffects]),
		StoreModule.forFeature(promptStateFeatureName, promptStateReducers),
	],
})
export class PromptStateModule {}
