import { AxiosPromise } from 'axios';
import { apiClient } from './AxiosService';

export function getAllEvents(): AxiosPromise<any> {
	return apiClient({
		method: 'get',
		url: '/events',
	});
}

export function getConflicts(): AxiosPromise<any> {
	return apiClient({
		method: 'get',
		url: '/conflicts',
	});
}

export function getEmailsByEventId(eventId: number): AxiosPromise<any> {
	return apiClient({
		method: 'get',
		url: `/conflicts/${eventId}`,
	});
}

export async function addEvent(event: any) {
	apiClient({
		method: 'post',
		url: '/events/add',
		data: event,
	});
}

export async function updateEvent(id: number, event: any) {
	apiClient({
		method: 'put',
		url: `/events/update/${id}`,
		data: event,
	});
}

export async function removeEvent(id: number) {
	apiClient({
		method: 'post',
		url: `/events/delete/${id}`,
	});
}

export async function restoreEvent(id: number) {
	apiClient({
		method: 'post',
		url: `/events/restore/${id}`,
	});
}
