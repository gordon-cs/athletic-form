//Currently does nothing

import { CardContent, Grid, CardHeader, Button, 
    Card, Paper, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, CardActions } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, removeEvent } from '../Services/EventService';
import '../styles/eventCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';

interface Props {
	eventData: any;
}

export const EventDetailsHeader: React.FC<Props> = ({ eventData }) => {
	//const params: any = useParams();
	// id = params.id;
	let departHome;
	let headerHome;
	let arrival;
	//let navigate = useNavigate();
	
	return() {
		if (eventData.homeOrAway === 'Home') {
			headerHome = (<CardHeader
				className={'card-header isHome'}
				title={eventData.sport + ': ' + eventData.opponent}
				subheader={'Date: ' + getDateTimeAsJs(eventData.eventDate)}
			/>)
			departHome = <CardContent className={'card-detail'}>Home</CardContent>;
		} else {
			headerHome = (<CardHeader
				className={'card-header'}
				title={eventData.sport + ': ' + eventData.opponent}
				subheader={'Date: ' + getDateTimeAsJs(eventData.eventDate)}
			/>)
			eventData.departHome = (
				<CardContent className={'card-detail'}>
					Depart Time: {getDateTimeAsJs(eventData.departureTime)}
				</CardContent>
			);
		}
	
		return (
			/*I want to rework the layout of this page*/
			<Grid>
				<h1 className = "card-label">Event Details</h1>
					{headerHome}
			</Grid>
		);
	}
	
};