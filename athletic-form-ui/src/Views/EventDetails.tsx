import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, removeEvent } from '../Services/EventService';
import { Card, CardHeader, CardContent, Button, CardActions } from '@mui/material';
import '../styles/eventCard.scss';
import { Link, useNavigate } from 'react-router-dom';

interface Props {}

export const EventDetails: React.FC<Props> = () => {
	const params: any = useParams();
	const id = params.id;
	const [eventData, setEventData] = useState<any | null>(null);
	let departHome;
	let navigate = useNavigate();

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
	}, [id]);

	const handleClick = () => {
		removeEvent(params.id)
			.then((a: any) => {
				navigate('/events');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (eventData?.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>Home</CardContent>;
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {eventData?.departOrHome}
			</CardContent>
		);
	}

	return (
        /*I want to rework the layout of this page*/
		<Grid>
			<h1>Event Details</h1>
				<CardHeader
					className={'card-header'}
					title={eventData?.sport + ': ' + eventData?.opponent}
					subheader={'Date: ' + eventData?.date}
				/>
				<CardContent className={'card-content'}>
					<CardContent className={'card-detail'}>Time: {eventData?.time}</CardContent>
					{departHome}
				</CardContent>
				<CardActions className={'card-content card-action'}>
					<Link to='/events'>
						<Button
							size='small'
							sx={{ backgroundColor: 'red', color: 'white' }}
							variant={'outlined'}
						>
							Back
						</Button>
					</Link>
				</CardActions>
		</Grid>
	);
};
