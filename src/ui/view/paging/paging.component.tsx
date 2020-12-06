import { RemoteData } from '@devexperts/remote-data-ts';
import * as remoteData from '@devexperts/remote-data-ts';
import React from 'react';
import { RenderRemoteData } from '../ui-kit/render-remote-data/render-remote-data.component';

interface PagingProps {
	page: number;
	pages: RemoteData<Error, number>;
	setPage: (page: number) => void;
}

export const Paging = (props: PagingProps) => {
	// TODO: add selected styles
	const getButtons = (pages: number) => (
		<div>
			{new Array(pages).fill(0).map((_, index) => (
				<button onClick={() => props.setPage(index)} key={index}>
					{index}
				</button>
			))}
		</div>
	);

	return <RenderRemoteData data={props.pages} success={getButtons} />;
};
