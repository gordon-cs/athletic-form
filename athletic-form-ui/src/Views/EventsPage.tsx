import { Grid } from '@mui/material';
import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { EventCard } from '../Components/EventCard';
import { Event } from '../Models/Event';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { FaPlusCircle } from 'react-icons/fa';
import "../styles/eventsPage.scss";
import { Link } from 'react-router-dom';

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
										entry['sport'],
										entry['opponent'],
										entry['date'],
										entry['time'],
										entry['departOrHome'],
									)
								}
							/>
						</Grid>
				  ))}
			<Card className={'add-card'}>
				<CardHeader className={'add-header'} title={'Add'}></CardHeader>
				<CardActions className={'add-action'}>
					<Link to = "/events/add">
						<Button
							size='large'
							sx={{ backgroundColor: '#710F0F', color: 'white' }}
							variant={'outlined'}
						>
							<FaPlusCircle></FaPlusCircle>
						</Button>
					</Link>
				</CardActions>
			</Card>
		</Grid>
	);
};
