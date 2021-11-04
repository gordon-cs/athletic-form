import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3000/',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const get = (apiEndpoint: string) => {
	return instance.get(apiEndpoint);
};

export const post = (apiEndpoint: string, request: any) => {
	return instance.post(apiEndpoint, request);
}
