import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { PromptStateModule } from './state/prompt/prompt.store.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		StoreModule.forRoot({}),
		PromptStateModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			autoPause: true,
		}),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
