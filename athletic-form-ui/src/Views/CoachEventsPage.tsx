import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { CoachEventCard } from '../Components/CoachEventCard';
import { Grid, CardHeader, Button, Card, CardActions } from '@mui/material';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import '../styles/eventsPage.scss';
import { Link } from 'react-router-dom';

export const CoachEventsPage: React.FC = () => {
	const [events, setEvents] = useState<any | null>(null);

	useEffect(() => {
		getAllEvents()
			.then((res) => {
				let eventList = res.data.filter((e: any) => {
					return e.isDeleted === false;
				});
				console.log(eventList);
				setEvents(eventList);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<Grid>
			<h1>Athletic Events: Coach's View</h1>
			<Link to=''>
				<Button
					size='small'
					sx={{ backgroundColor: '#710F0F', color: 'white' }}
					variant={'outlined'}
				>
					<FaTrashAlt></FaTrashAlt>
					View Deleted Events
				</Button>
			</Link>
			<Grid container spacing={3}>
				{events == null
					? 'There are no events to show'
					: events.map((entry: any) => (
							<Grid item key={entry['eventId']}>
								<CoachEventCard
									eventData={{
										eventId: entry['eventId'],
										sport: entry['sport'],
										opponent: entry['opponent'],
										date: entry['eventDate'],
										departOrHome: entry['homeOrAway'],
										destination: entry['destination'],
										departureTime: entry['departureTime'],
									}}
								/>
							</Grid>
					  ))}
				{/* <Card className={'add-card'}>
					<CardHeader className={'add-header'} title={'Add'}></CardHeader>
					<CardActions className={'add-action'}>
						<Link to='/events/add'>
							<Button
								size='large'
								sx={{ backgroundColor: '#710F0F', color: 'white' }}
								variant={'outlined'}
							>
								<FaPlusCircle></FaPlusCircle>
							</Button>
						</Link>
					</CardActions>
				</Card> */}
			</Grid>
		</Grid>
	);
};
