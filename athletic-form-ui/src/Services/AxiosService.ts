/* Handles our axios calls, which allow us to access and upload information
 */

import axios from 'axios';

const token = localStorage.getItem('token');

export const apiClient = axios.create({
	baseURL: 'https://athleticabsence.gordon.edu/api',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `${token}`
	},
});
