import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import '../styles/coachEventCard.scss';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';

interface Props {
	eventData: any;
}

export function RemoveCard() {
	console.log('Add delete functionality here I guess');
}

export const CoachEventCard: React.FC<Props> = ({ eventData }) => {
	let departHome, conflicts, random;

	if (eventData.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateTimeAsJs(eventData.departureTime)}
			</CardContent>
		);
	}

	// FIXME: Currently using a random display value (need to get from db)
	random = (Math.floor(Math.random() * 10));
	conflicts = (
		<CardContent className={'card-detail'}>
			There are {random} students with conflicts.
		</CardContent>
	)

	return (
		<Card className={'card'} variant={'outlined'}>
			<Link to = {`/coach/events/${eventData.eventId}/details`}>
				<CardHeader
					className={'card-header'}
					title={eventData.sport + ': ' + eventData.opponent}
					subheader={'Date: ' + getDateTimeAsJs(eventData.date)}
				/>
			</Link>
			<CardContent className={'card-content'}>
				{departHome}
			</CardContent>
			<CardContent className={'card-content'}>
				{conflicts}
			</CardContent>
			<CardActions className={'card-content card-action'}>
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
				<Link to = {`/events/${eventData.eventId}/update`} >
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
