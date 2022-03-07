import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, getConflictsByEventId } from '../Services/EventService';
import {
	CardContent,
	Grid,
	CardHeader,
	Button,
	Card,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography
} from '@mui/material';
import { getDateAsJs, getDateTimeAsJs, getTimeAsJs } from '../Helpers/DateTimeHelpers';
import '../styles/eventCard.scss';

export const CoachEventDetails: React.FC = () => {
	let params = useParams();
	let id: any = params.id;
	let departHome;
	let arrival;
	const [eventData, setEventData] = useState<any | null>(null);
	const [conflicts, setConflicts] = useState<any | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		// TODO: Add timeout validation on redirect
		if (token == undefined) {
			window.location.href = "...";
		}
		getAllEvents()
			.then((res: any) => {
				setEventData(
					res.data.find((e: any) => {
						return e.eventId === parseInt(id);
					}),
				);
			})
			.then(() => {
				getConflictsByEventId(parseInt(id)).then((res: any) => {
					console.log(res.data);
					setConflicts(res.data);
				});
			})
			.catch((error) => console.log(error.message));
	}, [id]);


	let headerHome;
	if (eventData?.homeOrAway === 'Home') {
		departHome = <CardContent className={'card-detail'}>Home</CardContent>;
		if (eventData?.isScrimmage) {
			if (conflicts?.length === 0) {
				headerHome = (<CardHeader
					className={'card-header isHome scrimmage'}
					title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
				/>)
			}
			else {
				headerHome = (<CardHeader
					className={'card-header isHomeConflict scrimmage'}
					title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
				/>)
			}
		}
		else {
			if (conflicts?.length === 0) {
				headerHome = (<CardHeader
					className={'card-header isHome'}
					title={eventData?.sport + ': ' + eventData?.opponent}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
				/>)
			}
			else {
				headerHome = (<CardHeader
					className={'card-header isHomeConflict'}
					title={eventData?.sport + ': ' + eventData?.opponent}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
				/>)
			}
		}
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: <br></br> {getDateAsJs(eventData?.departureTime)} <br></br> {getTimeAsJs(eventData?.departureTime)}
			</CardContent>
		);
		if (eventData?.isScrimmage) {
			if (conflicts?.length === 0) {
				headerHome = (<CardHeader
					className={'card-header scrimmage'}
					title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
				/>)
			}
			else {
				headerHome = (<CardHeader
					className={'card-header scrimmage conflict'}
					title={eventData?.sport + ': ' + eventData?.opponent + ' (scrimmage)'}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
				/>)
			}
		}
		else {
			if (conflicts?.length === 0) {
				headerHome = (<CardHeader
					className={'card-header'}
					title={eventData?.sport + ': ' + eventData?.opponent}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
				/>)
			}
			else {
				headerHome = (<CardHeader
					className={'card-header conflict'}
					title={eventData?.sport + ': ' + eventData?.opponent}
					subheader={<Typography sx={{color: "white"}}>{'Date: ' + getDateTimeAsJs(eventData?.eventDate)}</Typography>}
				/>)
			}
		}
		arrival = (
			<CardContent className={'card-detail'}>
				Return Time: <br></br> {getDateAsJs(eventData?.arrivalTime)} <br></br> {getTimeAsJs(eventData?.arrivalTime)}
			</CardContent>
		);
	}

	return (
		<Grid>
			<h1 className = "card-label">Event Details: Coach's View</h1>
			<Card>
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
			</Card>
			<TableContainer component={Paper}>
				<Table sx={{ width: 1000 }}>
					<TableHead>
						<TableRow>
							<TableCell>Email</TableCell>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Approval Status</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{conflicts === null ? (
							<TableRow>
								<TableCell>No students to show</TableCell>
							</TableRow>
						) : (
							conflicts?.map((conflict: any) => (
								<TableRow key={Math.random() * 3.1415982465}>
									<TableCell>{conflict['email']} </TableCell>
									<TableCell>{conflict['firstName']}</TableCell>
									<TableCell>{conflict['lastName']}</TableCell>
									{Math.random() < 0.5 ? ( //Leave this for presentation
										<TableCell sx={{ color: 'green' }}>Approved</TableCell>
									) : (
										<TableCell sx={{ color: 'red' }}>Not Approved</TableCell>
									)}
									<TableCell>
										<Link to={`/coach/events/${id}/details/${conflict['email']}/classconflicts`}>View Class Conflicts</Link>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Link to='/coach/events'>
				<Button
					size='small'
					sx={{ backgroundColor: 'red', color: 'white' }}
					variant={'outlined'}
				>
					Back
				</Button>
			</Link>
		</Grid>
	);
};
