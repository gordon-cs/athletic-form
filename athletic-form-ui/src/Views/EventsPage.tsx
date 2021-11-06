import { Grid } from '@mui/material';
import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { EventCard } from '../Components/EventCard';

interface Props {}

export const EventsPage: React.FC<Props> = () => {
	const [events, setEvents] = useState<any | null>(null);

	useEffect(() => {
		console.log(getAllEvents());
		getAllEvents()
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => console.log(error.message));
	}, []);

	return (
		<Grid container spacing={3}>
			{events}
		</Grid>
	);
};
