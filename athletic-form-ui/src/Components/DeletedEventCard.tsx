import { Button, Card, CardActions, CardContent, CardHeader,
	Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { FaTrashRestoreAlt, FaTrashAlt } from 'react-icons/fa';
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
	let headerHome;
	let arrival;

	if (eventData.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
		if (eventData?.isScrimmage) {
			headerHome = (
				<CardHeader
					className={'card-header isHome scrimmage'}
					title={eventData.sport + ': ' + eventData.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
				/>
			);
		}
		else {
			headerHome = (
				<CardHeader
					className={'card-header isHome'}
					title={eventData.sport + ': ' + eventData.opponent}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
				/>
			);
		}
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateTimeAsJs(eventData.departureTime)}
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
				Return Time: {getDateTimeAsJs(eventData.arrivalTime)}
			</CardContent>
		);
	}

	return (
		<Card className={'card'} variant={'outlined'}>
			{headerHome}
			<CardContent className={'card-content'}>
				{departHome}
			</CardContent>
			<CardContent className={'card-content'}>{arrival}</CardContent>
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
				<Link to={`/events/deleted/${eventData.eventId}/harddelete`}>
					<Button
						size='small'
						sx={{ backgroundColor: '#710F0F', color: 'white' }}
						variant={'outlined'}
					>
                        <FaTrashAlt></FaTrashAlt>
						Permanent Delete
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
};
