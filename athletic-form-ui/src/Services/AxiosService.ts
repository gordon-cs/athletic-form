/* Handles our axios calls, which allow us to access and upload information
 */

import axios from 'axios';

const token = localStorage.getItem('token');

export const apiClient = axios.create({
	baseURL: 'https://localhost:5001/api',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `${token}`
	},
});
