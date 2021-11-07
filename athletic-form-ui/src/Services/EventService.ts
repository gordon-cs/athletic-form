import { AxiosPromise } from 'axios';
import { apiClient } from './AxiosService';

export function getAllEvents(): AxiosPromise<any> {
	return apiClient({
		url: '/events',
	});
}

export async function addEventHandler(event: Event, eventId: number) {
	const data = {
		id: eventId,
		...event,
	};

	return apiClient.post('Events', data);
}
