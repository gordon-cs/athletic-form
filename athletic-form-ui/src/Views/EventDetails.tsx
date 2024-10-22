import { CardContent, Grid, CardHeader, Button, 
    Card, Paper, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, CardActions, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, getCoachRosterData } from '../Services/EventService';
import '../styles/eventCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getDateAsJs, getTimeAsJs, getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import { EventCardHeader } from '../Components/EventCardBase';


export const EventDetails: React.FC = () => {
    let params = useParams();
    let id : any = params.id;
    let departHome;
	let headerHome;
	let arrival;
    const [eventData, setEventData] = useState<any | null>(null);
    const [coaches, setCoaches] = useState<any | null>(null);

    useEffect(() => {
		const token = localStorage.getItem('token');
		if (token == undefined) {
			window.location.href = "..";
		}
        getAllEvents().then((res: any) => {
			let val = res.data.find((e: any) => {
                return e.eventId === parseInt(id);
            })
            setEventData(val);
			getCoachRosterData(val.sport).then((res: any) => {
				console.log(res.data);
				setCoaches(res.data);
			}).catch((error) => console.log(error));
        }).catch((error) => console.log(error.message));
		console.log(eventData);
    }, [id]);

	if (eventData?.homeOrAway === 'Home') {
		if (eventData?.isScrimmage) {
			headerHome = (<CardHeader
				className={'card-header isHome scrimmage'}
				title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
				subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
			/>)
		}
		else {
			headerHome = (<CardHeader
				className={'card-header isHome'}
				title={eventData?.sport + ': ' + eventData?.opponent}
				subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
			/>)
		}
		departHome = <CardContent className={'card-detail'}>Home</CardContent>;
	} else {
		if (eventData?.isScrimmage) {
			headerHome = (<CardHeader
				className={'card-header scrimmage'}
				title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
				subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
			/>)
		}
		else {
			headerHome = (<CardHeader
				className={'card-header'}
				title={eventData?.sport + ': ' + eventData?.opponent}
				subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
			/>)
		}
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: <br></br> {getDateAsJs(eventData?.departureTime)} <br></br> {getTimeAsJs(eventData?.departureTime)}
			</CardContent>
		);
		arrival = (
			<CardContent className={'card-detail'}>
				Return Time: <br></br> {getDateAsJs(eventData?.arrivalTime)} <br></br> {getTimeAsJs(eventData?.departureTime)}
			</CardContent>
		);
	}

	return (
        /*I want to rework the layout of this page*/
		<Grid>
			<h1 className = "card-label">Event Details</h1>
				{headerHome}
				<CardContent className={'card-content'}>
					<CardContent className={'card-detail'}>Time: <br></br> {getDateAsJs(eventData?.eventDate)}
						<br></br> {getTimeAsJs(eventData?.eventDate)}</CardContent>
					{departHome}
					{arrival}
				</CardContent>
				<CardContent sx = {{justifyContent: "center"}} className={'card-content'}>
					{eventData?.comments ? 
						<CardContent className={'card-detail'}>Comments: <br></br> {eventData?.comments}</CardContent> : ""
					}
				</CardContent>
				<CardContent className={'card-content'}>
					Show Robin's details.
				</CardContent>
				<TableContainer component={Paper}>
					<Table sx = {{width: 1000}}>
						<TableHead>
							<TableRow>
								<TableCell>Coach</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Contact</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{coaches === null ?
							<TableRow>
								<TableCell>No coaches assigned. This is probably an error.</TableCell>
							</TableRow> : 
								coaches?.map((coach: any) => (
								<TableRow key = {coach.gordon_ID}>
									<TableCell>{coach.firstName + " " + coach.lastName}</TableCell>
									<TableCell>{coach.coachTitle}</TableCell>
									<TableCell><a href={`mailto:${coach.email}`}>{coach.email}</a></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<CardActions className={'card-content card-action'}>
					<Link to='/events'>
						<Button
							size='small'
							sx={{ backgroundColor: 'red', color: 'white' }}
							variant={'outlined'}
						>
							Back
						</Button>
					</Link>
				</CardActions>
		</Grid>
	);
};
