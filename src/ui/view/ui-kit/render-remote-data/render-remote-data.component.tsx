import { RemoteData } from '@devexperts/remote-data-ts/dist/remote-data';
import { constNull, pipe } from 'fp-ts/lib/function';
import React, { memo } from 'react';
import * as remoteData from '@devexperts/remote-data-ts';

export const DEFAULT_ERROR_MESSAGE = 'error';

interface RenderRemoteDataProps<E, A> {
	readonly data: RemoteData<E, A>;
	readonly success: (value: A) => JSX.Element | null;
	readonly failure?: (e: E) => JSX.Element | null;
	readonly className?: string;
}

interface RenderRemoteDataComponent {
	<E, A>(props: RenderRemoteDataProps<E, A>): JSX.Element | null;
}

export const RenderRemoteData: RenderRemoteDataComponent = memo((props) =>
	pipe(
		props.data,
		remoteData.fold(
			constNull,
			() => <div className={props.className}>loading ...</div>,
			(error) => {
				console.warn(error);
				return props.failure ? props.failure(error) : <div>{DEFAULT_ERROR_MESSAGE}</div>;
			},
			(data) => props.success(data),
		),
	),
);
