import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import {
	historyStateFeatureName,
	historyStateReducers,
} from './history.reducers';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { HistoryEffects } from './history.effects';
import { HistoryService } from './history.service';

@NgModule({
	imports: [
		EffectsModule.forFeature([HistoryEffects]),
		HttpClientModule,
		StoreModule.forFeature(historyStateFeatureName, historyStateReducers),
	],
	providers: [HistoryService],
})
export class HistoryStateModule {}
