import { get, post } from './AxiosService';

export async function getAllEvents(): Promise<any> {
	return get('Events');
}

export async function addEventHandler(event : Event, eventId : number) {
	console.log(event);
	const request = {
		id: eventId,
		...event
	}

	return post("Events", request);
}