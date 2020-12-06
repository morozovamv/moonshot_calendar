import React from 'react';
import { RemoteData } from '@devexperts/remote-data-ts';
import { RenderRemoteData } from '../ui-kit/render-remote-data/render-remote-data.component';

type Launch = {
	id: number;
	name: string;
	location: {
		name: string;
		pads: Array<{ mapURL: string; latitude: number; longitude: number }>;
	};
	windowstart: string;
	windowend: string;
};

interface LaunchesProps {
	launches: RemoteData<Error, Launch[]>;
}

export const Launches = (props: LaunchesProps) => {
	const renderSuccess = (launches: Launch[]) => (
		<div>
			{launches.map((launch) => (
				// TODO: Use regular styles, not inline
				<div key={launch.id} style={{ marginTop: 20 }}>
					<div key={launch.id}>{launch.name}</div>
					{/* TODO: Change date format for better ux */}
					<div>
						Starts between {launch.windowstart} and {launch.windowend}
					</div>
					<div>
						{launch.location.pads.map((pad) => (
							<a href={pad.mapURL} target="_blank">
								Pad on map
							</a>
						))}
					</div>
				</div>
			))}
		</div>
	);

	const renderError = (error: Error) => <div>{error.message}</div>;

	return <RenderRemoteData data={props.launches} success={renderSuccess} failure={renderError} />;
};
