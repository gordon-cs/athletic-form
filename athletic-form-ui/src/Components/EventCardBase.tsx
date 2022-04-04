/* Handles the default style of Cards, and contains the building blocks they're
   made of. This is used so that our styles are consistent across our views with
   minimal copy/pasted code.
 */

import { CardContent, Grid, CardHeader, Button, 
    Card, Paper, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, CardActions } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, removeEvent } from '../Services/EventService';
import { Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getDateAsJs, getTimeAsJs, getDateTimeAsJs } from '../Helpers/DateTimeHelpers';

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
		cardHeader = "card-header " + scrimmage + " " + sportColor;
	else         //The coach view
		cardHeader = "card-header " + scrimmage + " " + conflict + " " + sportColor;

	if (eventData?.departOrHome === 'Home') {
		homeOrNot = "isHome";
		if (eventData?.isScrimmage) {
			headerHome = (<CardHeader
							className={`${cardHeader}`}
							title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
							subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData?.date)}</Typography>}
						/>)
		}
		else {
			headerHome = (<CardHeader
				className={`${cardHeader}`}
				title={eventData?.sport + ': ' + eventData?.opponent}
				subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData?.date)}</Typography>}
			/>)
		}
	} else {
		if (eventData?.isScrimmage) {
			headerHome = (
				<CardHeader
					className={`${cardHeader}`}
					title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData?.date)}</Typography>}
				/>
			);
		}
		else {
			headerHome = (
				<CardHeader
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
	let sportColor = 'is' + eventData?.sport;
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