import React from 'react';
import { Grid, Box } from '@mui/material';

export const Loader: React.FC = () => {
    return (
		<Grid>
			<Box
				height='100vh'
				width='100vh'
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
			>
				<h1>Athletic Form</h1>
			</Box>
		</Grid>
	);
};