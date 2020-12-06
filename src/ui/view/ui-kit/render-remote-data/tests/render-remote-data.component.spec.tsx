import React from 'react';
import { render, screen } from '@testing-library/react';
import { DEFAULT_ERROR_MESSAGE, RenderRemoteData } from '../render-remote-data.component';
import * as remoteData from '@devexperts/remote-data-ts';

describe('render-remote-data.component.spec.tsx', () => {
	test('should render loaded data', () => {
		const loadedData = remoteData.success('loaded data');

		render(<RenderRemoteData data={loadedData} success={(data) => <div>{data}</div>} />);
		const loadedDataText = screen.getByText(/loaded data/i);
		expect(loadedDataText).toBeInTheDocument();
	});

	test('should render loading', () => {
		const dataInProgress = remoteData.pending;

		render(<RenderRemoteData data={dataInProgress} success={(data) => <div>{data}</div>} />);
		const loadingText = screen.getByText(/loading .../i);
		expect(loadingText).toBeInTheDocument();
	});

	test('should render default error message', () => {
		// disable warn logs from RenderRemoteData on failure case
		jest.spyOn(console, 'warn').mockImplementation(jest.fn());

		const errorData = remoteData.failure(new Error('error'));

		render(<RenderRemoteData data={errorData} success={(data) => <div>{data}</div>} />);
		const defaultErrorText = screen.getByText(DEFAULT_ERROR_MESSAGE);
		expect(defaultErrorText).toBeInTheDocument();
	});

	test('should render custom error message', () => {
		// disable warn logs from RenderRemoteData on failure case
		jest.spyOn(console, 'warn').mockImplementation(jest.fn());

		const errorData = remoteData.failure(new Error('error'));

		render(
			<RenderRemoteData
				data={errorData}
				success={(data) => <div>{data}</div>}
				failure={() => <div>custom error</div>}
			/>,
		);
		const customErrorText = screen.getByText(/custom error/i);
		expect(customErrorText).toBeInTheDocument();
	});
});
