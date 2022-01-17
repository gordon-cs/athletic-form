import { Grid } from '@mui/material';
import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { EventCard } from '../Components/EventCard';
import { Button, Card, CardActions, CardHeader } from '@mui/material';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import '../styles/eventsPage.scss';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { setEventFilters } from '../Helpers/FilterHelpers';


export const EventsPage: React.FC = () => {
	const [events, setEvents] = useState<any | null>(null);
	const [filter, setFilter] = useState<any | null>(null);

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
			<h1>Athletic Events</h1>
			<Link to='/events/deleted'>
				<Button
					size='small'
					sx={{ backgroundColor: '#710F0F', color: 'white' }}
					variant={'outlined'}
				>
					<FaTrashAlt></FaTrashAlt>
					View Deleted Events
				</Button>
			</Link>
			<h3>Filter By: {" "}
				<TextField
					label='SPORT'
					value={filter?.sport}
					onChange={(e: any) => {
						setFilter([{ sport: e.target.value }]);
					}}
				/>
				{" "}
				<TextField
					label='OPPONENT'
					value={filter?.opponent}
					onChange={(e: any) => {
						setFilter([{ opponent: e.target.value }]);
					}}
				/>
				{" "}
				<TextField
					value={filter?.depart}
					type='datetime-local'
					onChange={(e: any) => {
						setFilter([{ depart: e.target.value }]);
					}}
				/>
				{" "}
				<Button
					size='medium'
					sx={{ backgroundColor: 'green', color: 'white' }}
					variant={'outlined'}
					onClick={() => setEventFilters(events, filter)}
				> Apply </Button>
			</h3> 
			<Grid container spacing={3}>
				{events == null
					? 'There are no events to show'
					: events.map((entry: any) => (
							<Grid item key={entry['eventId']}>
								<EventCard
									eventData={{
										eventId: entry['eventId'],
										sport: entry['sport'],
										opponent: entry['opponent'],
										date: entry['eventDate'],
										departOrHome: entry['homeOrAway'],
										destination: entry['destination'],
										departureTime: entry['departureTime'],
										arrivalTime: entry['arrivalTime'],
										comments: entry['comments']
									}}
								/>
							</Grid>
					  ))}
				<Card className={'add-card'}>
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
				</Card>
			</Grid>
		</Grid>
	);
};
