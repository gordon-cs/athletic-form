import { Grid, Typography } from '@mui/material';
import Axios from './Services/Axios';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

export const App = () => {

	const [content, setContent] = 
		useState<AxiosResponse | null>(null);
	
	useEffect(() => {
		Axios.get<AxiosResponse>("/values")
		.then((response) => {
			setContent(response.data);
		})
	}, [])


	return (
		<Grid container>
			<Grid item xs={4}>
				<Typography> { content } </Typography>
			</Grid>
		</Grid>
	);
};
