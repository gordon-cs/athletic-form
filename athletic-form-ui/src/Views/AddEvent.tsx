import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { getAllEvents, addEvent } from '../Services/EventService';
import { Button, Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/addEvent.scss';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Props {}

export const AddEvent: React.FC<Props> = () => {
	const [events, setEvents] = useState<any | null>(null);
	const [sport, setSport] = useState('');
	const [opponent, setOpponent] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [homeOrAway, setHomeOrAway] = useState('');
	const [destination, setDestination] = useState('');
	const [departureTime, setDepartureTime] = useState('');
	const [arrivalTime, setArrivalTime] = useState('');
	const [comments, setComments] = useState('');
	const [isScrimmage, setIsScrimmage] = useState(false);
	let navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		// TODO: Add timeout validation on redirect
		if (token == undefined) {
			window.location.href = "..";
		}
		getAllEvents()
			.then((res) => {
				setEvents(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleSubmit = () => {
		addEvent({ sport, opponent, homeOrAway, destination, eventDate, 
				departureTime, arrivalTime, comments, isScrimmage })
			.then((a: any) => {
				navigate('/events');
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Grid className='add-event'>
			<h1>Add Event</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					value={sport}
					label='Sport'
					onChange={(e: any) => {
						setSport(e.target.value);
					}}
				/>
				<br></br>
				<TextField
					value={opponent}
					label='Opponent'
					onChange={(e: any) => {
						setOpponent(e.target.value);
					}}
				/>
				<RadioGroup
					aria-label='isAway'
					defaultValue='home'
					name='radio-buttons-group'
					value={homeOrAway}
					onChange={(e: any) => {
						setHomeOrAway(e.target.value);
					}}
				>
					<FormControlLabel value='Home' control={<Radio />} label='Home' />
					<FormControlLabel value='Away' control={<Radio />} label='Away' />
				</RadioGroup>
				{/* Have the some information only show up if away*/}
				<TextField
					value={destination}
					label='Destination'
					onChange={(e: any) => {
						setDestination(e.target.value);
					}}
				/>
				<br></br><br></br>
				<TextField
					value={eventDate}
					type='datetime-local'
					label="Event Date"
					InputLabelProps={{ shrink: true }}
					onChange={(e: any) => {
						setEventDate(e.target.value);
					}}
				/>
				<br></br><br></br>
				<TextField
					type='datetime-local'
					value={departureTime}
					label='Departure Time'
					InputLabelProps={{ shrink: true }}
					onChange={(e: any) => {
						setDepartureTime(e.target.value);
					}}
				/>
				<br></br><br></br>
				<TextField
					type='datetime-local'
					value={arrivalTime}
					label='Arrival Time'
					InputLabelProps={{ shrink: true }}
					onChange={(e: any) => {
						setArrivalTime(e.target.value);
					}}
				/>
				<br></br><br></br>
				<TextField
					value={comments}
					label='Comments'
					onChange={(e: any) => {
						setComments(e.target.value);
					}}
					multiline style={{maxHeight: 80}}
				/>
				<br></br>
				<FormControlLabel 
					control={<Checkbox 
						checked={isScrimmage} 
						onChange={(e: any) => { 
							setIsScrimmage(e.target.checked)
						}}
					/>}
					label = "Scrimmage?"
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
