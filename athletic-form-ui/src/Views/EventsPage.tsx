import { Grid } from '@mui/material';
import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { EventCard } from '../Components/EventCard';
import { Event } from '../Models/Event';

interface Props {}

export const EventsPage: React.FC<Props> = () => {
	const [events, setEvents] = useState<any | null>(null);

	useEffect(() => {
		console.log(getAllEvents());
		getAllEvents()
			.then((res) => {
				console.log(res.data);
			})
			.catch(console.error);
	}, []);

	return (
		<Grid container spacing={3}>
			{events}
		</Grid>
	);
};
