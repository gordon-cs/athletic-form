import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import '../styles/coachEventCard.scss';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import { useState, useEffect } from 'react';
import { getConflictsByEventId } from '../Services/EventService';

interface Props {
	eventData: any;
}

export const CoachEventCard: React.FC<Props> = ({ eventData }) => {
	const [conflicts, setConflicts] = useState<any | null>(null);
	const [count, setCount] = useState<number>(0);
	useEffect(() => {
		getConflictsByEventId(eventData.eventId)
			.then((res: any) => {
				setConflicts(res.data);
			})
			.then(() => {
				setCount(conflicts?.length);
			})
			.catch((error) => console.log(error.message));
	});
	let departHome, numConflicts, headerHome;

	if (eventData.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
		headerHome = (
			<CardHeader
				className={'card-header isHome'}
				title={eventData.sport + ': ' + eventData.opponent}
				subheader={'Date: ' + getDateTimeAsJs(eventData.date)}
			/>
		);
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateTimeAsJs(eventData.departureTime)}
			</CardContent>
		);
		headerHome = (
			<CardHeader
				className={'card-header'}
				title={eventData.sport + ': ' + eventData.opponent}
				subheader={'Date: ' + getDateTimeAsJs(eventData.date)}
			/>
		);
	}

	numConflicts = (
		<CardContent className={'card-detail'}>
			There are {count} students with conflicts.
		</CardContent>
	);

	return (
		<Card className={'card'} variant={'outlined'}>
			<Link
				to={`/coach/events/${eventData.eventId}/details`}
				style={{ textDecoration: 'none' }}
			>
				{headerHome}
			</Link>
			<CardContent className={'card-content'}>{departHome}</CardContent>
			<CardContent className={'card-content'}>{numConflicts}</CardContent>
			<CardActions className={'card-content card-action'}>
				<Button
					disabled={true}
					size='small'
					sx={{ backgroundColor: '#710F0F', color: 'white' }}
					variant={'outlined'}
				>
					<FaTrashAlt></FaTrashAlt>
					Delete
				</Button>
				<Button
					disabled={true}
					size={'small'}
					sx={{ backgroundColor: '#066A1F', color: 'white' }}
					variant={'outlined'}
				>
					<FaPencilAlt></FaPencilAlt>
					Update
				</Button>
			</CardActions>
		</Card>
	);
};
