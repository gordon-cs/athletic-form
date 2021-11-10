import { AxiosPromise } from 'axios';
import { apiClient } from './AxiosService';

export function getAllEvents(): AxiosPromise<any> {
	return apiClient({
		method: 'get',
		url: '/events',
	});
}

export async function addEvent(event: any) {
	apiClient({
		method: 'post',
		url: '/events',
		data: event,
	});
}

export async function removeEvent(id: number) {
	apiClient({
		method: 'delete',
		url: `/events/${id}`,
	});
}
