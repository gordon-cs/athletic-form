import { Card } from '@mui/material';
import '../styles/eventCard.scss';
import { useState, useEffect } from 'react';
import { getConflictsByEventId } from '../Services/EventService';
import { EventCardHeader, EventCardContent } from './EventCardBase';

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
	

	

	return (
		<Card className={'card'} variant={'outlined'}>
			<EventCardHeader eventData={eventData} isCoach={true}></EventCardHeader>
			<EventCardContent eventData={eventData} isCoach={true}></EventCardContent>
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
