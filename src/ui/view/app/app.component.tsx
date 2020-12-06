import React, { memo } from 'react';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { DateRangeContainer } from '../date-range/date-range.container';
import { LaunchesContainer } from '../launches/launches.container';
import { PagingContainer } from '../paging/paging.container';

export const App = context.combine(
	DateRangeContainer,
	LaunchesContainer,
	PagingContainer,
	(DateRangeContainer, LaunchesContainer, PagingContainer) =>
		memo(() => {
			return (
				<div>
					<header>Moonshot Calendar</header>
					<DateRangeContainer />
					<LaunchesContainer />
					<PagingContainer />
				</div>
			);
		}),
);
