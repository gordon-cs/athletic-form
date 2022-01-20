import { Button, Card, CardActions, CardContent, CardHeader, 
	Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDateAsJs, getTimeAsJs, getDateTimeAsJs } from '../Helpers/DateTimeHelpers';

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

	if (eventData.departOrHome === 'Home') {
		homeOrNot = "isHome";
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
		if (eventData?.isScrimmage) {
			headerHome = (<CardHeader
							className={'card-header isHome scrimmage'}
							title={eventData.sport + ': ' + eventData.opponent + ' (scrimmage)'}
							subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
						/>)
		}
		else {
			headerHome = (<CardHeader
				className={'card-header isHome'}
				title={eventData.sport + ': ' + eventData.opponent}
				subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
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
					className={'card-header scrimmage'}
					title={eventData.sport + ': ' + eventData.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
				/>
			);
		}
		else {
			headerHome = (
				<CardHeader
					className={'card-header'}
					title={eventData.sport + ': ' + eventData.opponent}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
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
				<Link to={`/events/${eventData.eventId}/delete`}>
					<Button
						size='small'
						sx={{ backgroundColor: '#710F0F', color: 'white' }}
						variant={'outlined'}
					>
						<FaTrashAlt></FaTrashAlt>
						Delete
					</Button>
				</Link>
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
