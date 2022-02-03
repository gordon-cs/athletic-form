import { Button, Card, CardActions, CardContent, CardHeader, 
	Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDateAsJs, getTimeAsJs, getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import { removeEvent } from '../Services/EventService';

interface Props {
	eventData: any;
}

export const EventCard: React.FC<Props> = ({ eventData }) => {
	let departHome;
	let headerHome;
	let arrival;

	//Color code stuff
	let sportColor = 'is' + eventData.sport;
	let homeOrNot = "";
	let isPopupShown = false;

	//Delete popup window
	const togglePopup = () => {
		isPopupShown = true;
	}

	const handleDelete = () => {
		togglePopup();
		removeEvent(eventData.eventId)
			.then((a: any) => {
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (eventData.departOrHome === 'Home') {
		homeOrNot = "isHome";
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
		if (eventData?.isScrimmage) {
			headerHome = (<CardHeader
							className={`card-header isHome scrimmage ${sportColor}`}
							title={eventData.sport + ': ' + eventData.opponent + ' (scrimmage)'}
							subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
						/>)
		}
		else {
			headerHome = (<CardHeader
				className={`card-header isHome ${sportColor}`}
				title={eventData.sport + ': ' + eventData.opponent}
				subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
			/>)
		}
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateAsJs(eventData.departureTime)}<br></br> {getTimeAsJs(eventData.departureTime)}
			</CardContent>
		);
		if (eventData?.isScrimmage) {
			headerHome = (
				<CardHeader
					className={`card-header scrimmage ${sportColor}`}
					title={eventData.sport + ': ' + eventData.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
				/>
			);
		}
		else {
			headerHome = (
				<CardHeader
					className={`card-header ${sportColor}`}
					title={eventData.sport + ': ' + eventData.opponent}
					subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
				/>
			);
		}
		arrival = (
			<CardContent className={'card-detail'}>
				Return Time: {getDateAsJs(eventData.arrivalTime)}<br></br> {getTimeAsJs(eventData.arrivalTime)}
			</CardContent>
		);			
	}

	return (
		<Card className={'card'} variant={'outlined'}>
			<Link to={`/events/${eventData.eventId}/details`} style={{ textDecoration: 'none' }}>
				{headerHome}
			</Link>
			<CardContent className={`card-content ${homeOrNot}`}>
				{departHome}
			</CardContent>
			<CardContent className={`card-content ${homeOrNot}`}>
				{arrival}
			</CardContent>
			<CardActions className={`card-content ${homeOrNot} card-action`}>
					<Button
						size='small'
						sx={{ backgroundColor: '#710F0F', color: 'white' }}
						variant={'outlined'}
						onClick={handleDelete}
					>
						<FaTrashAlt></FaTrashAlt>
						Delete
					</Button>
				<Link to={`/events/${eventData.eventId}/update`}>
					<Button
						size={'small'}
						sx={{ backgroundColor: '#066A1F', color: 'white' }}
						variant={'outlined'}
					>
						<FaPencilAlt></FaPencilAlt>
						Update
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
};
