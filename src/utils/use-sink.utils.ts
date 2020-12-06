import { Sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { useEffect, useMemo } from 'react';

export const useSink = <A>(factory: () => Sink<A>, dependencies: unknown[]): A => {
	// eslint-disable-next-line
	const sa = useMemo(factory, dependencies);
	const subscription = useMemo(() => sa.effects.subscribe(), [sa]);
	useEffect(() => () => subscription.unsubscribe(), [subscription]);
	return sa.value;
};
