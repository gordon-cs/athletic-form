import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllEvents, updateEvent } from '../Services/EventService';
import { Button, Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/addEvent.scss';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Props {}

export const UpdateEvent: React.FC<Props> = () => {
	const [eventData, setEventData] = useState<any | null>(null);
	let navigate = useNavigate();
	const params: any = useParams();
	const id = params.id;

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token == undefined) {
			window.location.href = "..";
		}
		getAllEvents()
			.then((res) => {
				setEventData(
					res.data.find((e: any) => {
						return e.eventId === parseInt(id);
					}),
				);
			})
			.catch((error) => console.log(error.message));
	}, [id]);

	const handleSubmit = () => {
		console.log(updateEvent(id, eventData));
		updateEvent(id, eventData)
			.then((a: any) => {
				navigate('/events');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Grid className='add-event'>
			<h1>Update Event</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					value={eventData?.sport}
					onChange={(e: any) => {
						setEventData({ ...eventData, sport: e.target.value });
					}}
				/>
				<br></br>
				<TextField
					value={eventData?.opponent}
					onChange={(e: any) => {
						setEventData({ ...eventData, opponent: e.target.value });
					}}
				/>
				<RadioGroup
					aria-label='isAway'
					value={eventData?.homeOrAway}
					name='radio-buttons-group'
					onChange={(e: any) => {
						setEventData({ ...eventData, homeOrAway: e.target.value });
					}}
				>
					<FormControlLabel value='Home' control={<Radio />} label='Home' />
					<FormControlLabel value='Away' control={<Radio />} label='Away' />
				</RadioGroup>
				{/* Have the some information only show up if away*/}
				<TextField
					value={eventData?.destination}
					onChange={(e: any) => {
						setEventData({ ...eventData, destination: e.target.value });
					}}
				/>
				<br></br>
				<TextField
					value={eventData?.eventDate}
					type='datetime-local'
					onChange={(e: any) => {
						setEventData({ ...eventData, eventDate: e.target.value });
					}}
				/>
				<br></br>
				<TextField
					type='datetime-local'
					value={eventData?.departureTime}
					onChange={(e: any) => {
						setEventData({ ...eventData, departureTime: e.target.value });
					}}
				/>
				<br></br>
				<TextField
					type='datetime-local'
					value={eventData?.arrivalTime}
					onChange={(e: any) => {
						setEventData({ ...eventData, arrivalTime: e.target.value });
					}}
				/>
				<br></br>
				<TextField
					value={eventData?.comments}
					onChange={(e: any) => {
						setEventData({ ...eventData, comments: e.target.value });
					}}
				/>
				<br></br>
				<FormControlLabel 
					control={<Checkbox 
						checked={eventData?.isScrimmage} 
						onChange={(e: any) => { 
							setEventData({ ...eventData, isScrimmage: e.target.checked });
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
