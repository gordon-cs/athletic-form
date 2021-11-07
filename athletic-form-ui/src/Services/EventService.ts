import { AxiosPromise } from 'axios';
import { apiClient } from './AxiosService';

export function getAllEvents(): AxiosPromise<any> {
	return apiClient({
		url: '/events',
	});
}

export async function addEventHandler(event : Event, eventId : number) {
	const request = {
		id: eventId,
		...event
	}

	//return post("Events", request);
}