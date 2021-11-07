import { Grid } from '@mui/material';
import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { EventCard } from '../Components/EventCard';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { FaPlusCircle } from 'react-icons/fa';
import "../styles/eventsPage.scss";
import { Link } from 'react-router-dom';

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
			{events == null
				? 'There are no events to show'
				: events.map((entry: any) => (
						<Grid item key={entry['id']}>
							<EventCard
								eventData={{
										sport: entry['sport'],
										opponent: entry['opponent'],
										date: entry['date'],
										time: entry['time'],
										departOrHome: entry['departOrHome'],
										destination: entry['destination']
								}}
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
