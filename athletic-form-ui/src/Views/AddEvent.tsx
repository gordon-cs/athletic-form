import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { getAllEvents, addEvent } from '../Services/EventService';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/addEvent.scss';

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
				<label>
					Sport:
					<input
						type='text'
						value={sport}
						onChange={(e: any) => setSport(e.target.value)}
					></input>
				</label>
				<br></br>
				<label>
					Opponent:
					<input
						type='text'
						value={opponent}
						onChange={(e: any) => setOpponent(e.target.value)}
					></input>
				</label>
                <div>
                    <input type="radio" value="Home" name="isAway" /> Home
                    <input type="radio" value="Away" name="isAway" /> Away
                </div>
				<br></br>
				<label>
					Destination:
					<input
						type='text'
						value={destination}
						onChange={(e: any) => setDestination(e.target.value)}
					></input>
				</label>
				<br></br>
				<label>
					Date:
					<input
						type='date'
						value={date}
						onChange={(e: any) => setDate(e.target.value)}
					></input>
				</label>
				<br></br>
				<label>
					Time:
					<input
						type='text'
						value={time}
						onChange={(e: any) => setTime(e.target.value)}
					></input>
				</label>
				<br></br>
				<label>
					Home/Departure Time
					<input
						type='text'
						value={departOrHome}
						onChange={(e: any) => setHomeOrDepart(e.target.value)}
					></input>
				</label>
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
