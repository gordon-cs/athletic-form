import axios, { AxiosResponse } from 'axios';

export const getEvents = (): AxiosResponse<unknown, any> | any => {
	axios
		.get<AxiosResponse>('http://localhost:3000/Events')
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
};
