import { Button, Card, CardActions, CardContent, CardHeader,
	Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { FaTrashRestoreAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import { 
	MdSportsBaseball, 
	MdSportsBasketball,
	MdDirectionsRun,
	MdSportsHockey,
	MdSportsGolf,
	MdRowing,
	MdSportsSoccer,
	MdSportsTennis,
	MdSportsVolleyball
} from 'react-icons/md';
import { FaSwimmer } from 'react-icons/fa';
import { GiLion } from 'react-icons/gi';

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
	let sportIcon;

	switch (eventData?.sport) {
		case "M Baseball":
		case "W Softball":
			sportIcon = (
				<MdSportsBaseball />
			);
			break;
		case "M Basketball":
		case "W Basketball":
			sportIcon = (
				<MdSportsBasketball />
			);
			break;
		case "M Cross Country":
		case "W Cross Country":
		case "M Track & Field":
		case "W Track & Field":
			sportIcon = (
				<MdDirectionsRun />
			);
			break;
		case "W Field Hockey":
			sportIcon = (
				<MdSportsHockey />
			);
			break;
		case "M Golf":
			sportIcon = (
				<MdSportsGolf />
			);
			break;
		case "M Rowing":
		case "W Rowing":
			sportIcon = (
				<MdRowing />
			);
			break;
		case "M Soccer":
		case "W Soccer":
			sportIcon = (
				<MdSportsSoccer />
			);
			break;
		case "M Swimming":
		case "W Swimming":
			sportIcon = (
				<FaSwimmer />
			);
			break;
		case "M Tennis":
		case "W Tennis":
			sportIcon = (
				<MdSportsTennis />
			);
			break;
		case "W Volleyball":
			sportIcon = (
				<MdSportsVolleyball />
			);
			break;
		default:
			sportIcon = (
				<GiLion />
			);
			break;
	}

	if (eventData.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
		if (eventData?.isScrimmage) {
			headerHome = (
				<CardHeader
					avatar={sportIcon}
					className={'card-header isHome scrimmage'}
					title={eventData.sport + ': ' + eventData.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
				/>
			);
		}
		else {
			headerHome = (
				<CardHeader
					avatar={sportIcon}
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
					avatar={sportIcon}
					className={'card-header scrimmage'}
					title={eventData.sport + ': ' + eventData.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
				/>
			);
		}
		else {
			headerHome = (
				<CardHeader
					avatar={sportIcon}
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
