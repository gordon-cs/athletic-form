import { Grid } from '@mui/material';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllEvents, updateEvent } from '../Services/EventService';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/addEvent.scss';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Props {}

export const UpdateEvent: React.FC<Props> = () => {
	const [eventData, setEventData] = useState<any | null>(null);
    const [events, setEvents] = useState<any | null>(null);
	const [sport, setSport] = useState('');
	const [opponent, setOpponent] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [homeOrAway, setHomeOrAway] = useState('');
	const [destination, setDestination] = useState('');
	const [departureTime, setDepartureTime] = useState('');
	let navigate = useNavigate();
    const params: any = useParams();
	const id = params.id;
	let departHome;


	useEffect(() => {
		getAllEvents()
			.then( (res) => {
				setEventData(
					res.data.find((e: any) => {
						return e.eventId === parseInt(id);
					})
				);
			})
			.catch((error) => console.log(error.message));
	}, [id]);
	

	const handleSubmit = () => {
		updateEvent(id, { sport, opponent, homeOrAway, destination, eventDate, departureTime }).then((a: any) => {
			navigate("/events");
		}).catch((error) => {
			console.log(error);
		});
	};


	return (
		<Grid className='add-event'>
			<h1>Update Event</h1>
			<form onSubmit={handleSubmit}>	
				<TextField
					value={eventData?.sport} //{sport}
					//label='Sport'
					onChange={(e: any) => {
						setSport(e.target.value);
					}}
				/>
				<br></br>
				<TextField
					value={eventData?.opponent}
					//label='Opponent'
					onChange={(e: any) => {
						setOpponent(e.target.value);
					}}
				/>
				<RadioGroup aria-label='isAway' defaultValue='home' name='radio-buttons-group'
					value={homeOrAway} onChange ={(e: any) => {
						setHomeOrAway(e.target.value);
					}}>
					<FormControlLabel value='Home' control={<Radio />} label='Home' />
					<FormControlLabel value='Away' control={<Radio />} label='Away' />
				</RadioGroup>
				{/* Have the some information only show up if away*/}
				<TextField
					value={eventData?.destination}
					//label='Destination'
					onChange={(e: any) => {
						setDestination(e.target.value);
					}}
				/>
				<br></br>
				<TextField
					value={eventData?.eventDate}
					type="datetime-local"
					//label={eventDate}
					onChange={(e: any) => {
						setEventDate(e.target.value);
					}}
				/>
				<br></br>
				<TextField
					type="datetime-local"
					value={eventData?.departureTime}
					//label='Departure Time'
					onChange={(e: any) => {
						setDepartureTime(e.target.value);
					}}
				/>
				<br></br>
				<Button
					size='small'
					sx={{ backgroundColor: 'green', color: 'white' }}
					variant={'outlined'}
					type='submit'
				>
					Save
				</Button>
				<Link to='/events'>
					<Button
						size='small'
						sx={{ backgroundColor: 'red', color: 'white' }}
						variant={'outlined'}
					>
						Cancel
					</Button>
				</Link>
			</form>
		</Grid>
	);
};
