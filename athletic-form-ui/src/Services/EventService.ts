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

export function getConflictsByEventId(eventId: number): AxiosPromise<any> {
	return apiClient({
		method: 'get',
		url: `/conflicts/${eventId}`,
	});
}

export function getClassesEnrolled(email: string, yearCode: string, 
	termCode: string) : AxiosPromise<any> {
	return apiClient({
		method: 'get',
		url: `/accounts/studentsenrolledin/${email}/${yearCode}/${termCode}`,
	});
}

export async function getAllTeams() {
	return apiClient({
		method: 'get',
		url: '/teams'
	})
}

export async function getRosterData(sport: string) {
	return apiClient({
		method: 'get',
		url: `/teams/${sport}`
	})
}

export async function getAccountByEmail(email: string) {
	return apiClient({
		method: 'get',
		url: `/accounts/${email}`
	})
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

export async function hardDeleteEvent(id: number) {
	apiClient({
		method: 'post',
		url: `/events/harddelete/${id}`
	})
}

export async function addToTeamRoster(playerInTeam: any) {
	apiClient({
		method: 'post',
		url: '/teams/add/',
		data: playerInTeam
	})
}

export async function removeFromTeamRoster(sport: String, 
	gordonId: String) {
	apiClient({
		method: 'post',
		url: `/teams/${sport}/delete/${gordonId}`
	})
}
