import { Grid } from '@mui/material';
import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { EventCard } from '../Components/EventCard';
import { Event } from '../Models/Event';

interface Props {}

export const EventsPage: React.FC<Props> = () => {
	const [events, setEvents] = useState<any | null>(null);

	useEffect(() => {
		getAllEvents().then((res) => {
			setEvents(res.data);
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
