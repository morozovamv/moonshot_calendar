import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { pipe } from 'fp-ts/lib/function';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { httpRequest } from '../../api/http-client';
import { liveData } from '@devexperts/rx-utils/dist/live-data.utils';
import * as remoteData from '@devexperts/remote-data-ts';
import { either } from 'fp-ts';
import { RemoteData } from '@devexperts/remote-data-ts';
import { isErrorResponse, LaunchesTO, validateLaunches } from './app.store.model';

// TODO: should be derived from launches response
const ELEMENTS_ON_PAGE = 10;
// INITIAL_START_DATE should be calculated as new Date()
const INITIAL_START_DATE = '2020-12-06';
// INITIAL_END_DATE should be calculated as new Date() + 3 months
const INITIAL_END_DATE = '2021-03-06';

export interface AppStore {
	startDate: BehaviorSubject<string>;
	endDate: BehaviorSubject<string>;
	setStartDate: (date: string) => void;
	setEndDate: (date: string) => void;
	launches$: Observable<RemoteData<Error, LaunchesTO>>;
	// TODO: the paging section may be separated as independent view model
	page: BehaviorSubject<number>;
	pages$: Observable<RemoteData<Error, number>>;
	setPage: (page: number) => void;
}

export interface NewAppStore {
	(): AppStore;
}

export const newAppStore = context.of<unknown, NewAppStore>(() => {
	const startDate = new BehaviorSubject<string>(INITIAL_START_DATE);
	const setStartDate = (date: string) => startDate.next(date);

	const endDate = new BehaviorSubject<string>(INITIAL_END_DATE);
	const setEndDate = (date: string) => endDate.next(date);

	const dateRangeToRequest = pipe(
		combineLatest([startDate, endDate]),
		map(([startDate, endDate]) => `${startDate}/${endDate}`),
	);

	const paging = new BehaviorSubject<number>(0);
	const setPage = (page: number) => paging.next(page);

	const launchesResponse$ = pipe(
		combineLatest([dateRangeToRequest, paging]),
		switchMap(([dateRangeToRequest, paging]) => {
			// TODO: calculate in a separate observable
			const offset = paging * ELEMENTS_ON_PAGE;
			return httpRequest(`https://launchlibrary.net/1.3/launch/${dateRangeToRequest}/?offset=${offset}`);
		}),
		map((response) => {
			if (
				remoteData.isSuccess(response) &&
				isErrorResponse(response.value) &&
				response.value.status === 'error'
			) {
				const error = new Error(response.value.msg);
				return remoteData.failure(error);
			}
			return response;
		}),
		liveData.map((data) => {
			if (validateLaunches(data)) {
				return either.right(data);
			}

			return either.left(new Error('Invalid data received by for selected period'));
		}),
		map((launchesResponse) => {
			if (remoteData.isSuccess(launchesResponse)) {
				if (either.isLeft(launchesResponse.value)) {
					return remoteData.failure(launchesResponse.value.left);
				}
				return remoteData.success(launchesResponse.value.right);
			}
			return launchesResponse;
		}),
		shareReplay({ refCount: true, bufferSize: 1 }),
	);

	const launches$ = pipe(
		launchesResponse$,
		liveData.map((launchesResponse) => launchesResponse.launches),
	);

	const pages$ = pipe(
		launchesResponse$,
		liveData.map((launchesResponse) => {
			const { total } = launchesResponse;

			// TODO: don't use mocks, move as separate logic to model, add tests
			const remainderOfDivision = total % ELEMENTS_ON_PAGE;
			const result = Math.floor(total / ELEMENTS_ON_PAGE);

			return remainderOfDivision === 0 ? result : result + 1;
		}),
	);

	return {
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		launches$,
		page: paging,
		pages$,
		setPage,
	};
});
