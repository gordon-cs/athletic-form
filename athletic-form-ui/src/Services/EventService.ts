import { apiClient } from './AxiosService';

export async function getAllEvents(): Promise<any> {
	return apiClient.get('Events');
}
