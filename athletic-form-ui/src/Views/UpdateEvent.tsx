import { Grid } from '@mui/material';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addEvent, getAllEvents, updateEvent } from '../Services/EventService';
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
	const [eventId, setEventId] = useState<any | null>(null);
	const [sport, setSport] = useState<any | null>();
	const [opponent, setOpponent] = useState<any | null>(null);
	const [date, setDate] = useState<any | null>(null);
	const [time, setTime] = useState<any | null>(null);
	const [departOrHome, setHomeOrDepart] = useState<any | null>(null);
	const [destination, setDestination] = useState<any | null>(null);
	let navigate = useNavigate();
    const params: any = useParams();
	const id = params.id;
	let departHome;

	useEffect(() => {
		getAllEvents()
			.then((res) => {
				setEventData(
					res.data.find((e: any) => {
						return e.id === parseInt(id);
					}),
				);
			})
			.catch((error) => console.log(error.message));
			setEventId(id);
	}, [id]);
	

	const handleSubmit = () => {
		updateEvent(eventId, { sport, opponent, date, time, departOrHome, destination }).then((a: any) => {
			navigate("/events");
		}).catch((error) => {
			console.log(error);
		});
	};


	return (
		<Grid className='update-event'>
			<h1>Edit Event</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					label= {eventData?.sport}
					onChange={(e: any) => {
						setSport(e.target.value);
					}}
				/>
				<br></br>
				<TextField
					label={eventData?.opponent}
					onChange={(e: any) => {	
						setOpponent(e.target.value);
					}}
				/>
				<RadioGroup aria-label='isAway' defaultValue='home' name='radio-buttons-group'>
					<FormControlLabel value='home' control={<Radio />} label='Home' />
					<FormControlLabel value='away' control={<Radio />} label='Away' />
				</RadioGroup>
				{/* Have the some information only show up if away*/}
				<TextField
					label={eventData?.destination}
					onChange={(e: any) => {
						setDestination(e.target.value);
					}}
				/>
				<br></br>
				<TextField
					value={eventData?.date}
					type= 'date'
					onChange={(e: any) => {
						setDate(e.target.value);
					}}
				/>
				<br></br>
				<TextField
					label={eventData?.time}
					onChange={(e: any) => {
						setTime(e.target.value);
					}}
				/>
				<br></br>
				<TextField
					label={eventData?.opponent}
					onChange={(e: any) => {
						setHomeOrDepart(e.target.value);
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
