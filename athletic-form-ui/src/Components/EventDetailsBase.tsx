import { CardContent, Grid, CardHeader, Button, 
    Card, Paper, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, CardActions } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, removeEvent } from '../Services/EventService';
import '../styles/eventCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import React from 'react';


export class EventDetailsHeader extends React.Component {
	headerHome: any;
	departHome: any;
	opponent: any;
	eventDate: any;
	sport: any;
	departureTime: any;
	eventData: any;
	
	constructor(props: any) {
		super(props);
		this.eventData = props.eventData;
	}
	render() {
		if (this.eventData.homeOrAway === 'Home') {
			this.headerHome = (<CardHeader
				className={'card-header isHome'}
				title={this.eventData.sport + ': ' + this.eventData.opponent}
				subheader={'Date: ' + getDateTimeAsJs(this.eventData.eventDate)}
			/>)
			this.departHome = <CardContent className={'card-detail'}>Home</CardContent>;
		} else {
			this.headerHome = (<CardHeader
				className={'card-header'}
				title={this.eventData.sport + ': ' + this.eventData.opponent}
				subheader={'Date: ' + getDateTimeAsJs(this.eventData.eventDate)}
			/>)
			this.departHome = (
				<CardContent className={'card-detail'}>
					Depart Time: {getDateTimeAsJs(this.eventData.departureTime)}
				</CardContent>
			);
		}
	
		return (
			/*I want to rework the layout of this page*/
			<Grid>
				<h1 className = "card-label">Event Details</h1>
					{this.headerHome}
			</Grid>
		);
	}
	
};