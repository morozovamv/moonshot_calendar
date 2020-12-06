export interface LaunchTO {
	id: number;
	name: string;
	location: {
		name: string;
		pads: Array<{ mapURL: string; latitude: number; longitude: number }>;
	};
	windowstart: string;
	windowend: string;
}

export interface LaunchesTO extends Array<LaunchTO> {}
export interface LaunchResponseTO {
	launches: LaunchesTO;
	count: number;
	offset: number;
	total: number;
}

// TODO:
// 1. should be separated to validateLaunches + validateLaunch + validateLocation + validatePads
// and used as function composition
// 2. add tests to check type guard
export const validateLaunches = (launchesTO: any): launchesTO is LaunchResponseTO =>
	launchesTO instanceof Object &&
	launchesTO.hasOwnProperty('count') &&
	typeof launchesTO.count === 'number' &&
	launchesTO.hasOwnProperty('offset') &&
	typeof launchesTO.offset === 'number' &&
	launchesTO.hasOwnProperty('total') &&
	typeof launchesTO.total === 'number' &&
	launchesTO.hasOwnProperty('launches') &&
	Array.isArray(launchesTO.launches) &&
	launchesTO.launches.every(
		(launch: any) =>
			launch instanceof Object &&
			launch.hasOwnProperty('id') &&
			typeof launch.id === 'number' &&
			launch.hasOwnProperty('name') &&
			typeof launch.name === 'string' &&
			launch.hasOwnProperty('location') &&
			launch.location instanceof Object &&
			launch.location.hasOwnProperty('name') &&
			typeof launch.location.name === 'string' &&
			launch.location.hasOwnProperty('pads') &&
			Array.isArray(launch.location.pads) &&
			launch.location.pads.every(
				(pad: any) =>
					pad instanceof Object &&
					pad.hasOwnProperty('mapURL') &&
					typeof pad.mapURL === 'string' &&
					pad.hasOwnProperty('latitude') &&
					typeof pad.latitude === 'number' &&
					pad.hasOwnProperty('longitude') &&
					typeof pad.longitude === 'number',
			) &&
			launch.hasOwnProperty('windowstart') &&
			typeof launch.windowstart === 'string' &&
			launch.hasOwnProperty('windowend') &&
			typeof launch.windowend === 'string',
	);

// TODO: add tests to check type guard
export const isErrorResponse = (response: any): response is { msg: string; status: string } =>
	response instanceof Object &&
	response.hasOwnProperty('msg') &&
	typeof response.msg === 'string' &&
	response.hasOwnProperty('status') &&
	typeof response.status === 'string';
