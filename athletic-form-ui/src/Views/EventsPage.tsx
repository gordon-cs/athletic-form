import { Grid } from '@mui/material';
import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { EventCard } from '../Components/EventCard';
import { Button, Card, CardActions, CardHeader } from '@mui/material';
import { FaFilter, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import '../styles/eventsPage.scss';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { setEventFilters, getSportList } from '../Helpers/FilterHelpers';


export const EventsPage: React.FC = () => {
	const [eventBank, setEventBank] = useState<any | null>(null);
	const [events, setEvents] = useState<any | null>(null);
	const [sportFilter, setSportFilter] = useState<any | null>(null);
	const [opponentFilter, setOpponentFilter] = useState<any | null>(null);
	const [dateFilter, setDateFilter] = useState<any | null>(null);

	useEffect(() => {
		getAllEvents()
			.then((res) => {
				let eventList = res.data.filter((e: any) => {
					return e.isDeleted === false;
				});
				console.log(eventList);
				setEventBank(eventList);
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
				<select 
					value={sportFilter} 
					onChange={(e: any) => {
						setSportFilter(e.target.value);
						setEvents(setEventFilters(eventBank, e.target.value, opponentFilter, dateFilter));
					}} 
				>
					<option value="">All Sports (Default)</option>
					<option value="Baseball">Baseball</option>
					<option value="Basketball">Basketball</option>
					<option value="Cross Country">Cross Country</option>
					<option value="Field Hockey">Field Hockey</option>
					<option value="Golf">Golf</option>
					<option value="Lacrosse">Lacrosse</option>
					<option value="Rowing">Rowing</option>
					<option value="Soccer">Soccer</option>
					<option value="Swimming">Swimming</option>
					<option value="Tennis">Tennis</option>
					<option value="Track and Field">Track and Field</option>
					<option value="Volleyball">Volleyball</option>
				</select>
				{" "}
				<TextField
					label='OPPONENT'
					value={opponentFilter}
					onChange={(e: any) => {
						setOpponentFilter(e.target.value);
					}}
				/>
				{" "}
				<TextField
					value={dateFilter}
					type='datetime-local'
					onChange={(e: any) => {
						setDateFilter(e.target.value);
					}}
				/>
				{" "}
				<Button
					onClick={() => {
						setEvents(setEventFilters(eventBank, sportFilter, opponentFilter, dateFilter));
					}}
					size='medium'
					sx={{ backgroundColor: 'green', color: 'white' }}
					variant={'outlined'}	
				> Apply </Button>
				<Button
					onClick={() => window.location.reload()}
					size='medium'
					sx={{ backgroundColor: 'red', color: 'white' }}
					variant={'outlined'}	
				> Clear </Button>
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
