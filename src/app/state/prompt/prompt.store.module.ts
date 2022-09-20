import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { promptStateFeatureName, promptStateReducers } from './prompt.reducers';

@NgModule({
	imports: [
		StoreModule.forFeature(promptStateFeatureName, promptStateReducers),
	],
})
export class PromptStateModule {}
