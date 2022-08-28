import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { commandFeatureName, commandReducers } from './command.reducers';

@NgModule({
	imports: [StoreModule.forFeature(commandFeatureName, commandReducers)],
})
export class CommandStateStoreModule {}
