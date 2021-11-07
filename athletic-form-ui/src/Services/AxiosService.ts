import axios from 'axios';

export const apiClient = axios.create({
	baseURL: 'http://localhost:5001/api',
	headers: {
		'Content-Type': 'application/json',
	},
});
<<<<<<< HEAD

export const get = (apiEndpoint: string) => {
	return instance.get(apiEndpoint);
};

export const post = (apiEndpoint: string, request: any) => {
	return instance.post(apiEndpoint, request);
}
=======
>>>>>>> origin/hudson-api
