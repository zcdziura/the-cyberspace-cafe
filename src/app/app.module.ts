import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CommandsStateModule } from './state/commands/commands.store.module';
import { HistoryStateModule } from './state/history/history.store.module';
import { PromptStateModule } from './state/prompt/prompt.store.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		CommandsStateModule,
		EffectsModule.forRoot(),
		HistoryStateModule,
		PromptStateModule,
		StoreModule.forRoot({}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			autoPause: true,
		}),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
