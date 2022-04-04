/*Handles the appearance and functionality of Cards in the Scheduler/Admin View
 */

import { Button, Card, CardActions, CardContent, CardHeader, 
	Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDateAsJs, getTimeAsJs, getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import { removeEvent } from '../Services/EventService';
import { DeleteEvent } from '../Views/DeleteEvent';
import { EventCardHeader, EventCardContent } from './EventCardBase';

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
	let popupObject = null;

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

	if (isPopupShown) {
		popupObject = <DeleteEvent></DeleteEvent>
	}


	return (
		<Card className={'card'} variant={'outlined'}>
			{popupObject}
			<EventCardHeader eventData={eventData} isCoach={false}></EventCardHeader>
			<EventCardContent eventData={eventData} isCoach={false}></EventCardContent>

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
