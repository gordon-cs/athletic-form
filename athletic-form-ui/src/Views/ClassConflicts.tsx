import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, getConflictsByEventId, 
    getClassesEnrolled } from '../Services/EventService';
import { Grid, Paper, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, Button } from '@mui/material';
import { getTimeAsJs } from '../Helpers/DateTimeHelpers';

export const ClassConflicts: React.FC = () => {
    let params = useParams();
    let id : any = params.id;
    let email : any = params.email;
    const [eventData, setEventData] = useState<any | null>(null);
    const [conflicts, setConflicts] = useState<any | null>(null);
    const [classes, setClasses] = useState<any | null>(null);

    useEffect(() => {
		getAllEvents()
			.then((res) => {
				setEventData(
					res.data.find((e: any) => {
						return e.eventId === parseInt(id);
					}));
			}).then(() => {
                getConflictsByEventId(parseInt(id)).then((res: any) => {
                    setConflicts(
                        res.data.filter((c: any) => {
                            return c.email === email;
                        })
                    );
                });
            }).then(() => {
                getClassesEnrolled(email).then((res: any) => {
                    setClasses(res.data);
                });
            })
			.catch((error) => console.log(error.message));
    }, [id]);
    
    console.log(conflicts);
    console.log(classes);

    return (
        <Grid>
            <h1>{eventData?.sport}: {eventData?.opponent}</h1>
            <h2>{conflicts && conflicts[0].firstName + " " + conflicts[0].lastName}</h2>
            <TableContainer component = {Paper}>
                <Table sx={{width: 1000}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Course Code</TableCell>
                            <TableCell>Course Title</TableCell>
                            <TableCell>Days of Week</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Conflict?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classes === null ? <TableRow>
                            <TableCell>There are no classes to show.</TableCell>
                        </TableRow> : classes?.map((course: any) => (
                            Math.random() < 0.5 ?
                            <TableRow key = {course.crs_cde}>
                                <TableCell sx = {{color: "red"}}>{course.crs_cde}</TableCell>
                                <TableCell sx = {{color: "red"}}>{course.crs_title}</TableCell>
                                <TableCell sx = {{color: "red"}}>{/*course.daysOfWeek*/}</TableCell>
                                <TableCell sx = {{color: "red"}}>{getTimeAsJs(course.begiN_TIM)}-{getTimeAsJs(course.enD_TIM)}</TableCell>
                                <TableCell sx = {{color: "red"}}>Yes</TableCell>
                            </TableRow> :
                            <TableRow key = {course.crs_cde}>
                                <TableCell>{course.crs_cde}</TableCell>
                                <TableCell>{course.crs_title}</TableCell>
                                <TableCell>{/*course.daysOfWeek*/}</TableCell>
                                <TableCell>{getTimeAsJs(course.begiN_TIM)}-{getTimeAsJs(course.enD_TIM)}</TableCell>
                                <TableCell>No</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>*
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
}