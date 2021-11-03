import { get } from './AxiosService';

export async function getAllEvents(): Promise<any> {
	return get('Events');
}
