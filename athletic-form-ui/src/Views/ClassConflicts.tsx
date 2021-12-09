import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents } from '../Services/EventService';
import { Grid, Paper, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, Button } from '@mui/material';

export const ClassConflicts: React.FC = () => {
    let params = useParams();
    let id : any = params.id;
    let studentId : any = params.studentId;
    const [eventData, setEventData] = useState<any | null>(null);
    const [students, setStudents] = useState<any | null>(null);
    const [studentData, setStudentData] = useState<any | null>(null);
    const [classes, setClasses] = useState<any | null>(null);

    useEffect(() => {
		getAllEvents()
			.then((res) => {
				setEventData(
					res.data.find((e: any) => {
						return e.eventId === parseInt(id);
					}));
			}).then(() => {
                setStudents([{ 
                    id: 1,
                    name: "Anthony Aardvark",
                    email: "anthony.aardvark@gordon.edu",
                    approved: true
                },
                {
                    id: 2,
                    name: "Boris Buffalo",
                    email: "boris.buffalo@gordon.edu",
                    approved: false
                },
                {
                    id: 3,
                    name: "Charlene Cat",
                    email: "charlene.cat@gordon.edu",
                    approved: true
                }]);
            }).then(() => {
                setClasses([{
                    courseCode: "BCM103",
                    courseTitle: "New Testament",
                    daysOfWeek: "MWF",
                    startTime: "11:30 AM",
                    endTime: "12:30 PM",
                    hasConflict: false
                }, {
                    courseCode: "CPS121",
                    courseTitle: "Introduction to Programming",
                    daysOfWeek: "MWF",
                    startTime: "3:20 PM",
                    endTime: "4:20 PM",
                    hasConflict: true
                }, {
                    courseCode: "CPS121L",
                    courseTitle: "Introduction to Programming Lab",
                    daysOfWeek: "R",
                    startTime: "9:45 AM",
                    endTime: "12:45 PM",
                    hasConflict: false
                }, {
                    courseCode: "COR107",
                    courseTitle: "The Great Conversation",
                    daysOfWeek: "TR",
                    startTime: "1:15 PM",
                    endTime: "2:50 PM",
                    hasConflict: false
                }, {
                    courseCode: "MAT121",
                    courseTitle: "Calculus I",
                    daysOfWeek: "MWF",
                    startTime: "2:10 PM",
                    endTime: "3:20 PM",
                    hasConflict: true
                }]);
            }).then(() => {
                setStudentData(students.find((s: any) => {
                    return s.id === parseInt(studentId);
                }));
            })
			.catch((error) => console.log(error.message));
	}, [id, students, studentId]);

    return (
        <Grid>
            <h1>{eventData?.sport}: {eventData?.opponent}</h1>
            <h2>{studentData?.name}</h2>
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
                            course.hasConflict ?
                            <TableRow key = {course.courseCode}>
                                <TableCell sx = {{color: "red"}}>{course.courseCode}</TableCell>
                                <TableCell sx = {{color: "red"}}>{course.courseTitle}</TableCell>
                                <TableCell sx = {{color: "red"}}>{course.daysOfWeek}</TableCell>
                                <TableCell sx = {{color: "red"}}>{course.startTime}-{course.endTime}</TableCell>
                                <TableCell sx = {{color: "red"}}>Yes</TableCell>
                            </TableRow> :
                            <TableRow key = {course.courseCode}>
                                <TableCell>{course.courseCode}</TableCell>
                                <TableCell>{course.courseTitle}</TableCell>
                                <TableCell>{course.daysOfWeek}</TableCell>
                                <TableCell>{course.startTime}-{course.endTime}</TableCell>
                                <TableCell>No</TableCell>
                            </TableRow>
                        ))}
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
}