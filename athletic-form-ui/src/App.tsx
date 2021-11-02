import { Grid, Typography } from '@mui/material';
import { getEvents } from './Services/AthleticEvents';
import { useEffect, useState } from 'react';
import { EventCard } from './Components/EventCard';
import axios, { AxiosResponse } from 'axios';
export const App = () => {
	const [content, setContent] = useState<any | null>(null);

	useEffect(() => {
		axios
			.get<AxiosResponse>('http://localhost:3000/Events')
			.then((response) => {
				console.log(response.data);
				setContent(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Grid container>
			<Grid item xs={4}>
				{content == null ? (
					<Typography> content is null </Typography>
				) : (
					<Typography>
						<EventCard sport={content[0]["Sport"]} opponent={content[0]["Opponent"]}
							date={content[0]["Date"]} time={content[0]["Time"]} 
							departHome={content[0]["Depart/Home"]}>
						</EventCard>
					</Typography>
				)}
			</Grid>
		</Grid>
	);
};
