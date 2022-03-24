import { Grid } from '@mui/material';
import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { EventCard } from '../Components/EventCard';
import { Button, Card, CardActions, CardHeader } from '@mui/material';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineTeam } from 'react-icons/ai';
import '../styles/eventsPage.scss';
import { Link } from 'react-router-dom';
import { setEventFilters, getSportList, getOpponentList } from '../Helpers/FilterHelpers';


export const EventsPage: React.FC = () => {
	const [eventBank, setEventBank] = useState<any | null>(null);
	const [events, setEvents] = useState<any | null>(null);
	const [sportFilter, setSportFilter] = useState<any | null>(null);
	const [opponentFilter, setOpponentFilter] = useState<any | null>(null);
	const [dateFilter, setDateFilter] = useState<any | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		// TODO: Add timeout validation on redirect
		if (token == undefined) {
			window.location.href = "..";
		} else {
			let role = JSON.parse(atob(token.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
			// Redirect scheduler to correct page
			if (role == "Staff") {
				window.location.href = "../coach/events";
			}
		}

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
			<Link to="/teams">
				<Button
					size='small'
					sx={{ backgroundColor: '#066A1F', color: 'white' }}
					variant={'outlined'}
				>
					<AiOutlineTeam />
					View Team Information
				</Button>
			</Link>
			<h3>Filter By: {" "}
				<select
					id="sportList"
					value={sportFilter} 
					onChange={(e: any) => {
						setSportFilter(e.target.value);
						setEvents(setEventFilters(eventBank, e.target.value, opponentFilter, dateFilter));
					}} 
				>
					<option value="">All Sports (Default)</option>
					{Array.from(getSportList(eventBank)).map((sport, index) => (
						<option
							key={String(sport)}
							value={String(sport)}
						>
							{String(sport)}
						</option>
						))}
				</select>
				{" "}
				<select
					id="opponentList" 
					value={opponentFilter} 
					onChange={(e: any) => {
						setOpponentFilter(e.target.value);
						setEvents(setEventFilters(eventBank, sportFilter, e.target.value, dateFilter));
					}} 
				>
					<option value="">All Opponents (Default)</option>
					{Array.from(getOpponentList(eventBank)).map((opponent, index) => (
						<option
							key={String(opponent)}
							value={String(opponent)}
						>
							{String(opponent)}
						</option>
						))}
				</select>
				{" "}
				<Button
					onClick={() => {
						setDateFilter("newest")
						setEvents(setEventFilters(eventBank, sportFilter, opponentFilter, dateFilter));
					}}
					size='small'
					sx={{ backgroundColor: 'black', color: 'white' }}
					variant={'outlined'}		
				> Newest </Button>
				{" "}
				<Button
					onClick={() => {
						setDateFilter("oldest")
						setEvents(setEventFilters(eventBank, sportFilter, opponentFilter, dateFilter)) 
					}}
					size='small'
					sx={{ backgroundColor: 'black', color: 'white' }}
					variant={'outlined'}	
				> Oldest </Button>
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
										comments: entry['comments'],
										isScrimmage: entry['isScrimmage']
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
