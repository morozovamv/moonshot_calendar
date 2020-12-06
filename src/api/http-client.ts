import { LiveData } from '@devexperts/rx-utils/dist/live-data.utils';
import { Observable } from 'rxjs';
import * as remoteData from '@devexperts/remote-data-ts';

const XHR_TIMEOUT = 5000;

export function httpRequest<Value>(url: string): LiveData<Error, Value> {
	return new Observable((subscriber) => {
		const xhr = new XMLHttpRequest();

		xhr.timeout = XHR_TIMEOUT;

		xhr.addEventListener('loadstart', () => subscriber.next(remoteData.pending));

		xhr.addEventListener('error', () => {
			const error = new Error('XHR error');
			subscriber.next(remoteData.failure(error));
			subscriber.complete();
		});

		xhr.addEventListener('timeout', () => {
			const error = new Error('XHR timeout');
			subscriber.next(remoteData.failure(error));
			subscriber.complete();
		});

		xhr.addEventListener('load', () => {
			const text = xhr.responseText === '' ? undefined : JSON.parse(xhr.responseText);
			subscriber.next(remoteData.success(text));
			subscriber.complete();
		});

		xhr.open('GET', url);
		xhr.send();

		return {
			unsubscribe(): void {
				xhr.abort();
			},
		};
	});
}
