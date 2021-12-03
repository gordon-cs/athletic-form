import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents } from '../Services/EventService';
import { CardContent, Grid, CardHeader, CardActions, 
    Button, Card } from '@mui/material';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';
import '../styles/coachEventCard.scss';

export const CoachEventDetails: React.FC = () => {
    let params = useParams();
    let id : any = params.id;
    let departHome;
    const [eventData, setEventData] = useState<any | null>(null);
    useEffect(() => {
        getAllEvents().then((res: any) => {
            setEventData(res.data.find((e: any) => {
                return e.eventId === parseInt(id);
            }));
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
        </Grid>
    );
}