import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, getConflicts, getClassesEnrolled } from '../Services/EventService';
import {
	Grid,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
} from '@mui/material';
import { getTimeAsJs } from '../Helpers/DateTimeHelpers';

export const ClassConflicts: React.FC = () => {
	let params = useParams();
	let id: any = params.id;
	let email: any = params.email;
	let yearCode: any = params.yearCode;
	let termCode: any = params.termCode;
	const [eventData, setEventData] = useState<any | null>(null);
	const [conflicts, setConflicts] = useState<any | null>(null);
	const [classes, setClasses] = useState<any | null>(null);

	useEffect(() => {
		getAllEvents()
			.then((res) => {
				setEventData(
					res.data.find((e: any) => {
						return e.eventId === parseInt(id);
					}),
				);
			})
			.then(() => {
				getConflicts().then((res: any) => {
					setConflicts(
						res.data.filter((c: any) => {
							return c.email === email && c.eventID === parseInt(id);
						}),
					);
				});
			})
			.then(() => {
				getClassesEnrolled(email, yearCode, termCode).then((res: any) => {
					setClasses(res.data);
				});
			})
			.catch((error) => console.log(error.message));
	}, [id]);

	console.log(conflicts);

	function hasConflict(course: any) {
		let courseCodes: any = [];
		let conflictExists = false;
		conflicts?.map((conflict: any) => {
			courseCodes.push(conflict.courseCode);
		});
		if (courseCodes.includes(course.crS_CDE)) {
			conflictExists = true;
		}
		return conflictExists;
	}

	console.log(classes);

	return (
		<Grid>
			<h1>
				{eventData?.sport}: {eventData?.opponent}
			</h1>
			<h2>{conflicts && conflicts[0].firstName + ' ' + conflicts[0].lastName}</h2>
			<TableContainer component={Paper}>
				<Table sx={{ width: 1000 }}>
					<TableHead>
						<TableRow>
							<TableCell>Course Code</TableCell>
							<TableCell>Conflict?</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{classes === null ? (
							<TableRow>
								<TableCell>There are no classes to show.</TableCell>
							</TableRow>
						) : (
							classes?.map((course: any) =>
								hasConflict(course) ? (
									<TableRow key={course.crS_CDE}>
										<TableCell sx={{ color: 'red' }}>
											{course.crS_CDE}
										</TableCell>
										<TableCell sx={{ color: 'red' }}>Yes</TableCell>
									</TableRow>
								) : (
									<TableRow key={course.crS_CDE}>
										<TableCell>{course.crS_CDE}</TableCell>
										<TableCell>No</TableCell>
									</TableRow>
								),
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Link to={`/coach/events/${id}/details`}>
				<Button
					size='small'
					sx={{ backgroundColor: 'red', color: 'white' }}
					variant={'outlined'}
				>
					Back to Details
				</Button>
			</Link>
		</Grid>
	);
};
