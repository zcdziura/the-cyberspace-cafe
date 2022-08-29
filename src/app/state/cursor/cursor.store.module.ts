import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { cursorStateFeatureName, cursorStateReducers } from './cursor.reducers';

@NgModule({
	imports: [
		StoreModule.forFeature(cursorStateFeatureName, cursorStateReducers),
	],
})
export class CursorStateStoreModule {}
