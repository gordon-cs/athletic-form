import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { getAllEvents, addEvent } from '../Services/EventService';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/addEvent.scss';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


interface Props {}

export const AddEvent: React.FC<Props> = () => {
	const [events, setEvents] = useState<any | null>(null);
	const [eventId, setEventId] = useState(0);
	const [sport, setSport] = useState('');
	const [opponent, setOpponent] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [departOrHome, setHomeOrDepart] = useState('');
	const [destination, setDestination] = useState('');

	useEffect(() => {
		getAllEvents().then((res) => {
			setEvents(res.data);
		});
	}, []);

	const handleSubmit = () => {
		setEventId(Math.max(events.map((e: any) => e.Id)) + 1);
		addEvent({ sport, opponent, date, time, departOrHome, destination }).catch((error) => {
			console.log(error);
		});
	};

	return (
		<Grid className='add-event'>
			<h1>Add Event</h1>
			<form onSubmit={handleSubmit}>
				<TextField value = {sport} 
					label = "Sport"
					onChange = {(e: any) => { setSport(e.target.value)}} />
				<br></br>
				<TextField value = {opponent} 
					label = "Opponent"
					onChange = {(e: any) => { setOpponent(e.target.value)}} />
				<RadioGroup 
					aria-label="isAway"
					defaultValue="home"
					name="radio-buttons-group"
				>
					<FormControlLabel value="home" control={<Radio />} label="Home" />
					<FormControlLabel value="away" control={<Radio />} label="Away" />
				</RadioGroup>
                {/* Have the some information only show up if away*/}
				<TextField value = {destination} 
					label = "Destination"
					onChange = {(e: any) => { setDestination(e.target.value)}} />
				<br></br>
				<TextField value = {date} 
					type = "date"
					label = "Date"
					onChange = {(e: any) => { setDate(e.target.value)}} />
				<br></br>
				<TextField value = {time} 
					label = "Time"
					onChange = {(e: any) => { setTime(e.target.value)}} />
				<br></br>
				<TextField value = {departOrHome} 
					label = "Home/Departure Time"
					onChange = {(e: any) => { setHomeOrDepart(e.target.value)}} />
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
