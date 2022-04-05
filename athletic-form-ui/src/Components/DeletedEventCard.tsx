/*Handles the appearance and functionality of Cards in the Deleted Events View
 */

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
	const iconSize = 45;

	switch (eventData?.sport) {
		case "M Baseball":
		case "W Softball":
			sportIcon = (
				<MdSportsBaseball size={iconSize} />
			);
			break;
		case "M Basketball":
		case "W Basketball":
			sportIcon = (
				<MdSportsBasketball size={iconSize} />
			);
			break;
		case "M Cross Country":
		case "W Cross Country":
		case "M Track & Field":
		case "W Track & Field":
			sportIcon = (
				<MdDirectionsRun size={iconSize} />
			);
			break;
		case "W Field Hockey":
			sportIcon = (
				<MdSportsHockey size={iconSize} />
			);
			break;
		case "M Golf":
			sportIcon = (
				<MdSportsGolf size={iconSize} />
			);
			break;
		case "M Rowing":
		case "W Rowing":
			sportIcon = (
				<MdRowing size={iconSize} />
			);
			break;
		case "M Soccer":
		case "W Soccer":
			sportIcon = (
				<MdSportsSoccer size={iconSize} />
			);
			break;
		case "M Swimming":
		case "W Swimming":
			sportIcon = (
				<FaSwimmer size={iconSize} />
			);
			break;
		case "M Tennis":
		case "W Tennis":
			sportIcon = (
				<MdSportsTennis size={iconSize} />
			);
			break;
		case "W Volleyball":
			sportIcon = (
				<MdSportsVolleyball size={iconSize} />
			);
			break;
		default:
			sportIcon = (
				<GiLion size={iconSize} />
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
