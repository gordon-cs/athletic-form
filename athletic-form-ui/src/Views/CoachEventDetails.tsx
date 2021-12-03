import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents } from '../Services/EventService';
import { CardContent, Grid, CardHeader, CardActions, 
    Button, Card, Paper, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody } from '@mui/material';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import '../styles/coachEventCard.scss';
import '../styles/coachEventDetails.scss';

export const CoachEventDetails: React.FC = () => {
    let params = useParams();
    let id : any = params.id;
    let departHome;
    const [eventData, setEventData] = useState<any | null>(null);
    const [students, setStudents] = useState<any | null>(null);

    useEffect(() => {
        getAllEvents().then((res: any) => {
            setEventData(res.data.find((e: any) => {
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
            }
        ]);
        })
        .catch((error) => console.log(error.message));
    }, [id]);

    console.log(students);

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
				<CardActions className={'card-content card-action'}>
					<Link to='/coach/events'>
						<Button
							size='small'
							sx={{ backgroundColor: 'red', color: 'white' }}
							variant={'outlined'}
						>
							Back
						</Button>
					</Link>
				</CardActions>
            </Card>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Approval Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students === null ?
                        <TableRow>
                            <TableCell>No students to show</TableCell>
                        </TableRow> : 
                            students?.map((student: any) => {
                            <TableRow>
                                <TableCell>{student.name}</TableCell>
                                {students.approved ?
                                    <TableCell className = {'approved'}>Approved</TableCell> :
                                    <TableCell className = {'unApproved'}>Not Approved</TableCell>
                                }
                                <TableCell><Link to = {''}>View Class Conflicts</Link></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}