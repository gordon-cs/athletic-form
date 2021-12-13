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
} from '@mui/material';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import '../styles/coachEventCard.scss';

export const CoachEventDetails: React.FC = () => {
	let params = useParams();
	let id: any = params.id;
	let departHome;
	const [eventData, setEventData] = useState<any | null>(null);
	const [conflicts, setConflicts] = useState<any | null>(null);

	useEffect(() => {
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

	if (eventData?.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>{eventData.departOrHome}</CardContent>;
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {getDateTimeAsJs(eventData?.departureTime)}
			</CardContent>
		);
	}

	return (
		<Grid>
			<h1>Event Details: Coach's View</h1>
			<Card>
				<CardHeader
					className={'card-header'}
					title={eventData?.sport + ': ' + eventData?.opponent}
					subheader={'Date: ' + getDateTimeAsJs(eventData?.eventDate)}
				/>
				<CardContent className={'card-content'}>
					<CardContent className={'card-detail'}>Time: {eventData?.time}</CardContent>
					{departHome}
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
