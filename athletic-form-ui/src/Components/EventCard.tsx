import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import '../styles/eventCard.scss';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';

interface Props {
	eventData: any;
}

export function RemoveCard() {
	console.log('Add delete functionality here I guess');
}

export const EventCard: React.FC<Props> = ({ eventData }) => {
	let departHome;

	let headerHome;
	if (eventData.departOrHome === 'Home') {
		departHome = null; /*Used to be -> <CardContent className={'card-detail'}>Home</CardContent>;-->*/
		headerHome = (<CardHeader
			className={'card-header isHome'}
			title={eventData.sport + ': ' + eventData.opponent}
			subheader={'Date: ' + eventData.date}
			/>)
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateTimeAsJs(eventData.departureTime)}
			</CardContent>
		);
		headerHome = (<CardHeader
						className={'card-header'}
						title={eventData.sport + ': ' + eventData.opponent}
						subheader={'Date: ' + eventData.date}
					/>)
	}

	return (
		<Card className={'card'} variant={'outlined'}>
			<Link to={`/events/${eventData.eventId}/details`}>
				<CardHeader
					className={'card-header'}
					title={eventData.sport + ': ' + eventData.opponent}
					subheader={'Date: ' + eventData.eventDate}
				/>
			</Link>
			<CardContent className={'card-content'}>
				{departHome}
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
