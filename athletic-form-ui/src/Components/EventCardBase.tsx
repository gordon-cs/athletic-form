//Currently does nothing

import { CardContent, CardHeader, Card, Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { Link } from 'react-router-dom';
import { getDateAsJs, getTimeAsJs, getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
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
	isCoach: boolean;
}

export const EventCardHeader: React.FC<Props> = ({ eventData , isCoach}) => {

	let headerHome;
	let homeOrNot;
	let cardHeader;
	let scrimmage;
	let isHome;
	let conflict;
	let sportIcon;
	const iconSize = 45;
	let sportColor = 'is' + eventData?.sport;

	if (eventData?.isScrimmage)
		scrimmage = "scrimmage";

	if (eventData?.departOrHome === 'Home') {
		isHome = "isHome"
		if (isCoach && eventData?.conflictCount !== 0)
			conflict = "isHomeConflict"
	} else if (isCoach && eventData?.conflictCount !== 0) {
		conflict = "conflict"
	}

	console.log(isCoach)
	
	//Determines what information should be shown in the header
	if (!isCoach) //Not the coach view
		cardHeader = "card-header " + scrimmage;
	else         //The coach view
		cardHeader = "card-header " + scrimmage + " " + conflict;



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

	if (eventData?.departOrHome === 'Home') {
		homeOrNot = "isHome";
		if (eventData?.isScrimmage) {
			headerHome = (<CardHeader
							avatar = {sportIcon}
							className={`${cardHeader}`}
							title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
							subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData?.date)}</Typography>}
						/>)
		}
		else {
			headerHome = (<CardHeader
				avatar = {sportIcon}
				className={`${cardHeader}`}
				title={eventData?.sport + ': ' + eventData?.opponent}
				subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData?.date)}</Typography>}
			/>)
		}
	} else {
		if (eventData?.isScrimmage) {
			headerHome = (
				<CardHeader
					avatar = {sportIcon}
					className={`${cardHeader}`}
					title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData?.date)}</Typography>}
				/>
			);
		}
		else {
			headerHome = (
				<CardHeader
					avatar = {sportIcon}
					className={`${cardHeader}`}
					title={eventData?.sport + ': ' + eventData?.opponent}
					subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData?.date)}</Typography>}
				/>
			);
		}		
	}
	
	let linkTo;
	if (!isCoach)
		linkTo = `/events/${eventData?.eventId}/details`;
	else
		linkTo = `/coach/events/${eventData?.eventId}/details`;
	return (
		/*I want to rework the layout of this page*/
		<Card className={'card'}>
			<Link to={`${linkTo}`} style={{ textDecoration: 'none' }}>
				{headerHome}
			</Link>
		</Card>
	);
	
};


export const EventCardContent: React.FC<Props> = ({ eventData , isCoach}) => {

	let departHome;
	let homeOrNot;
	let arrival;
	let numConflicts;


	if (eventData?.departOrHome === 'Home') {
		homeOrNot = "isHome";
		departHome = <CardContent className={'card-detail'}>{eventData?.departOrHome}</CardContent>;
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateAsJs(eventData?.departureTime)}<br></br> {getTimeAsJs(eventData?.departureTime)}
			</CardContent>
		);
		arrival = (
			<CardContent className={'card-detail'}>
				Return Time: {getDateAsJs(eventData?.arrivalTime)}<br></br> {getTimeAsJs(eventData?.arrivalTime)}
			</CardContent>
		);			
	}

	if (isCoach && eventData.conflictCount > 0 ) {
		numConflicts = (
			<CardContent className={`card-content ${homeOrNot}`}>
				<CardContent className={'card-detail'}>
					There are {eventData.conflictCount} students with conflicts.
				</CardContent>
			</CardContent>
		);
	}
	
	return (
		/*I want to rework the layout of this page*/
		<Card className={'card'}>
			<CardContent className={`card-content ${homeOrNot}`}>
				{departHome}
			</CardContent>
			{numConflicts}
			<CardContent className={`card-content ${homeOrNot}`}>
				{arrival}
			</CardContent>
		</Card>
	);
	
};
