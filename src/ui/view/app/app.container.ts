import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { createElement, memo, useMemo } from 'react';
import { App } from './app.component';
import { newAppStore } from '../../store/app.store';
import { useSink } from '../../../utils/use-sink.utils';

export const AppContainer = context.combine(
	context.defer(App, 'appStore'),
	newAppStore,
	(getAppComponent, newAppStore) =>
		memo(() => {
			const appStore = useMemo(() => newAppStore(), []);
			const AppComponent = useSink(() => getAppComponent({ appStore }), []);

			return createElement(AppComponent);
		}),
);
