import { Button, Card, CardActions, CardContent, CardHeader,
	Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import { useState, useEffect } from 'react';
import { getConflictsByEventId } from '../Services/EventService';
import { EventCardHeader } from './EventCardBase';

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

	eventData.conflictCount = count;

	//scss logic. Could probably be even more condensed
	let departHome, numConflicts, arrival;
	let scrimmage, isHome, conflict = "";
	let sportColor = 'is' + eventData.sport;
	if (eventData?.isScrimmage)
		scrimmage = "scrimmage";
	if (eventData.departOrHome === 'Home') {
		isHome = "isHome"
		if (count !== 0)
			conflict = "isHomeConflict"
	} else if (count !== 0) {
		conflict = "conflict"
	}
	let cardHeader = "card-header " + scrimmage + " " + conflict + " " + sportColor;

	if (eventData.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateTimeAsJs(eventData.departureTime)}
			</CardContent>
		);
		arrival = (
			<CardContent className={'card-detail'}>
				Return Time: {getDateTimeAsJs(eventData.arrivalTime)}
			</CardContent>
		);
	}

	if (count > 0) {
		numConflicts = (
			<CardContent className={'card-detail'}>
				There are {count} students with conflicts.
			</CardContent>
		);
	}

	return (
		<Card className={'card'} variant={'outlined'}>
			<EventCardHeader eventData={eventData} isCoach={true}></EventCardHeader>
			<CardContent className={`card-content + ${isHome}`}>{departHome}</CardContent>
			<CardContent className={`card-content + ${isHome}`}>{numConflicts}</CardContent>
			<CardContent className={`card-content + ${isHome}`}>{arrival}</CardContent>
			{/*<CardActions className={'card-content card-action'}>
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
			</CardActions>*/}
		</Card>
	);
};
