import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import '../styles/eventCard.scss';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
	eventData: any;
}

export function RemoveCard() {
	console.log('Add delete functionality here I guess');
}

export const EventCard: React.FC<Props> = ({ eventData }) => {
	let departHome;

	function getDateTimeAsJs(dateTime: any) {
		let dateAsJs = null;
		if (dateTime != null) {
			let parsedDate = new Date(Date.parse(dateTime));
			let time = convertTime(parsedDate.getUTCHours(), parsedDate.getUTCMinutes());
			let date = getDateAsJs(dateTime);
			dateAsJs = date + " " + time;
		}
		return dateAsJs;
	}

	if (eventData.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateTimeAsJs(eventData.departureTime)}
			</CardContent>
		);
	}

	function getDateAsJs(date: any) {
		let dateAsJs = null;
		if (date !== null) {
			let parsedDate = new Date(Date.parse(date));
			dateAsJs = (parsedDate.getMonth() + 1) + "/" + parsedDate.getUTCDate() + "/"
				+ parsedDate.getFullYear();
		}
		return dateAsJs;
	}

	function convertTime(hour: number, minute: number) {
		let timeAsJs = "";
		let hour12 = hour % 12;
		if (hour12 === 0) {
			hour12 = 12;
		}
		let ending = "";
		if (hour >= 12) {
			ending = " PM"
		} else {
			ending = " AM"
		}
		timeAsJs = hour12 + ":"
		if (minute < 10) {
			timeAsJs += "0";
		}
		timeAsJs += minute + ending;
		return timeAsJs
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
				<Button
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
