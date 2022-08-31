import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class HistoryService {
	constructor(private readonly http: HttpClient) {}

	public fetchBanner(): Observable<string[]> {
		return this.http
			.get('/assets/banner.txt', { responseType: 'text' })
			.pipe(map(text => text.split('\n')));
	}
}
