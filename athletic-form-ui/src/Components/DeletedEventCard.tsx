import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import '../styles/eventCard.scss';
import { FaTrashRestoreAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';

interface Props {
	eventData: any;
}

export function RemoveCard() {
	console.log('Add delete functionality here I guess');
}

export const DeletedEventCard: React.FC<Props> = ({ eventData }) => {
	let departHome;

	if (eventData.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateTimeAsJs(eventData.departureTime)}
			</CardContent>
		);
	}

	return (
		<Card className={'card'} variant={'outlined'}>
			<CardHeader
				className={'card-header'}
				title={eventData.sport + ': ' + eventData.opponent}
				subheader={'Date: ' + getDateTimeAsJs(eventData.date)}
			/>
			<CardContent className={'card-content'}>
				{departHome}
			</CardContent>
			<CardActions className={'card-content card-action'}>
				<Link to={`/events/deleted/${eventData.eventId}/recover`}>
					<Button
						size='small'
						sx={{ backgroundColor: '#F8A30F', color: 'white' }}
						variant={'outlined'}
					>
                        <FaTrashRestoreAlt></FaTrashRestoreAlt>
						Recover
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
};
