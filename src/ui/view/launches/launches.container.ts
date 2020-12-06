import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo } from 'react';
import { AppStore } from '../../store/app.store';
import { Launches } from './launches.component';
import { useObservable } from '../../../utils/use-observable.utils';
import * as remoteData from '@devexperts/remote-data-ts';

export const LaunchesContainer = context.combine(context.key<AppStore>()('appStore'), (appStore) =>
	memo(() => {
		const launches = useObservable(appStore.launches$, remoteData.pending);

		return createElement(Launches, { launches });
	}),
);
