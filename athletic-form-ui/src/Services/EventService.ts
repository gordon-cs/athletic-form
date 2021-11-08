import { AxiosPromise } from 'axios';
import { apiClient } from './AxiosService';

export function getAllEvents(): AxiosPromise<any> {
	return apiClient({
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

export async function removeEvent(event: any) {
	apiClient({
		method: 'delete',
		url: '/events',
		data: event,
	});
	console.log("SHOULD DELETE")
}
