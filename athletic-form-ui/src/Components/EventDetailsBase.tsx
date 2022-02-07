//Currently does nothing

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
}

export const EventDetailsHeader: React.FC<Props> = ({ eventData }) => {

	let departHome;
	let headerHome;
	let homeOrNot;
	let sportColor = 'is' + eventData.sport;
	let arrival;
	//let navigate = useNavigate();

	console.log (sportColor)
	console.log(getDateTimeAsJs(eventData.date))
	if (eventData.departOrHome === 'Home') {
		homeOrNot = "isHome";
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
		if (eventData?.isScrimmage) {
			headerHome = (<CardHeader
							className={`card-header isHome scrimmage ${sportColor}`}
							title={eventData.sport + ': ' + eventData.opponent + ' (scrimmage)'}
							subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
						/>)
		}
		else {
			headerHome = (<CardHeader
				className={`card-header isHome ${sportColor}`}
				title={eventData.sport + ': ' + eventData.opponent}
				subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
			/>)
		}
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateAsJs(eventData.departureTime)}<br></br> {getTimeAsJs(eventData.departureTime)}
			</CardContent>
		);
		if (eventData?.isScrimmage) {
			headerHome = (
				<CardHeader
					className={`card-header scrimmage ${sportColor}`}
					title={eventData.sport + ': ' + eventData.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
				/>
			);
		}
		else {
			headerHome = (
				<CardHeader
					className={`card-header ${sportColor}`}
					title={eventData.sport + ': ' + eventData.opponent}
					subheader={<Typography sx={{color: "black"}}>{'Date: ' + getDateTimeAsJs(eventData.date)}</Typography>}
				/>
			);
		}
		arrival = (
			<CardContent className={'card-detail'}>
				Return Time: {getDateAsJs(eventData.arrivalTime)}<br></br> {getTimeAsJs(eventData.arrivalTime)}
			</CardContent>
		);			
	}
	
	return (
		/*I want to rework the layout of this page*/
		<Card className={'card'}>
			<Link to={`/events/${eventData.eventId}/details`} style={{ textDecoration: 'none' }}>
				{headerHome}
			</Link>
			<CardContent className={`card-content ${homeOrNot}`}>
				{departHome}
			</CardContent>
			<CardContent className={`card-content ${homeOrNot}`}>
				{arrival}
			</CardContent>
		</Card>
	);
	
};