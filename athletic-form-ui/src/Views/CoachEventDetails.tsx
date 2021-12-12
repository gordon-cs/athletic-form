import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, getEmailsByEventId } from '../Services/EventService';
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
	const [emails, setEmails] = useState<any | null>(null);

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
				getEmailsByEventId(parseInt(id)).then((res: any) => {
					setEmails(res.data);
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
							<TableCell>Name</TableCell>
							<TableCell>Approval Status</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{emails === null ? (
							<TableRow>
								<TableCell>No students to show</TableCell>
							</TableRow>
						) : (
							emails?.map((email: any) => (
								<TableRow key={Math.random()}>
									<TableCell>{email}</TableCell>
									{Math.random() < 0.5 ? (
										<TableCell sx={{ color: 'green' }}>Approved</TableCell>
									) : (
										<TableCell sx={{ color: 'red' }}>Not Approved</TableCell>
									)}
									<TableCell>
										<Link
											to=''
										>
											View Class Conflicts
										</Link>
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
