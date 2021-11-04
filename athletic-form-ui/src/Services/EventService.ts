import { apiClient } from './AxiosService';

export async function getAllEvents(): Promise<any> {
	return await apiClient.get('/events/allEvents');
}
