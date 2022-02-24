import axios from 'axios';

const token = localStorage.getItem('token');

export const apiClient = axios.create({
	baseURL: 'https://localhost:5001/api',
	headers: {
		'Content-Type': 'application/json',
		'Auhtorization': `${token}`
	},
});
