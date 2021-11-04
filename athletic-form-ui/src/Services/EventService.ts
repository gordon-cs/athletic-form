import { AxiosPromise } from 'axios';
import { apiClient } from './AxiosService';

export function getAllEvents(): AxiosPromise<any> {
	return apiClient({
		url: 'events',
	});
}
