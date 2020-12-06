import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo, useCallback } from 'react';
import { AppStore } from '../../store/app.store';
import { useObservable } from '../../../utils/use-observable.utils';
import { Paging } from './paging.component';
import { useBehaviorSubject } from '../../../utils/use-behavior-subject.utils';
import * as remoteData from '@devexperts/remote-data-ts';

export const PagingContainer = context.combine(context.key<AppStore>()('appStore'), (appStore) =>
	memo(() => {
		const page = useBehaviorSubject(appStore.page);
		const pages = useObservable(appStore.pages$, remoteData.pending);
		const setPage = useCallback((page: number) => appStore.setPage(page), []);

		return createElement(Paging, { page, pages, setPage });
	}),
);
