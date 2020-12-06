import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo, useCallback } from 'react';
import { AppStore } from '../../store/app.store';
import { useBehaviorSubject } from '../../../utils/use-behavior-subject.utils';
import { DateRange } from './date-range.component';

export const DateRangeContainer = context.combine(context.key<AppStore>()('appStore'), (appStore) =>
	memo(() => {
		const startDate = useBehaviorSubject(appStore.startDate);
		const setStartDate = useCallback((date: string) => appStore.setStartDate(date), []);

		const endDate = useBehaviorSubject(appStore.endDate);
		const setEndDate = useCallback((date: string) => appStore.setEndDate(date), []);

		return createElement(DateRange, { startDate, endDate, setStartDate, setEndDate });
	}),
);
