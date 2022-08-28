import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CommandStateStoreModule } from './state/command/command.store.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		StoreModule.forRoot({}),
		CommandStateStoreModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			autoPause: true,
		}),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
