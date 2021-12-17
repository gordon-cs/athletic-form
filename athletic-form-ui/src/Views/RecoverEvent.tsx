import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, restoreEvent } from '../Services/EventService';
import { Card, CardHeader, CardContent, Button, CardActions,
	Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';

interface Props {}

export const RecoverEvent: React.FC<Props> = () => {
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
						return e.eventId === parseInt(id);
					}),
				);
			})
			.catch((error) => console.log(error.message));
	}, [id]);

	console.log(eventData);
	const handleClick = () => {
		restoreEvent(params.id)
			.then((a: any) => {
				navigate("/events/deleted");
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (eventData?.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateTimeAsJs(eventData?.departureTime)}
			</CardContent>
		);
	}

	return (
		<Grid>
			<h1>Do you want to recover this event?</h1>
			<Card className={'card'} variant={'outlined'}>
				<CardHeader
					className={'card-header'}
					title={eventData?.sport + ': ' + eventData?.opponent}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
				/>
				<CardContent className={'card-content'}>
					{departHome}
				</CardContent>
				<CardActions className={'card-content card-action'}>
					<Button
						size='small'
						sx={{ backgroundColor: 'green', color: 'white' }}
						variant={'outlined'}
						onClick={handleClick}
					>
						Yes
					</Button>
					<Link to='/events/deleted'>
						<Button
							size='small'
							sx={{ backgroundColor: 'red', color: 'white' }}
							variant={'outlined'}
						>
							No
						</Button>
					</Link>
				</CardActions>
			</Card>
		</Grid>
	);
};
