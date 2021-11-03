import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { EventCard } from './Components/EventCard';
import { Event } from './Models/Event';
import axios, { AxiosResponse } from 'axios';
export const App = () => {
	const [events, setEvents] = useState<any | null>(null);

	useEffect(() => {
		axios
			.get<AxiosResponse>('http://localhost:3000/Events')
			.then((response) => {
				console.log(response.data);
				setEvents(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Grid container spacing={3}>
			{events == null
				? 'There are no events to show'
				: events.map((entry: any) => (
						<Grid item key={entry['id']}>
							<EventCard
								eventData={
									new Event(
										entry['Sport'],
										entry['Opponent'],
										entry['Date'],
										entry['Time'],
										entry['Depart/Home'],
									)
								}
							/>
						</Grid>
				  ))}
		</Grid>
	);
};
