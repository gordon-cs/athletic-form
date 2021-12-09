import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, removeEvent } from '../Services/EventService';
import { Card, CardHeader, CardContent, Button, CardActions } from '@mui/material';
import '../styles/eventCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';


export const EventDetails: React.FC = () => {
    let params = useParams();
    let id : any = params.id;
    let departHome;
	let headerHome;
    const [eventData, setEventData] = useState<any | null>(null);
    const [students, setStudents] = useState<any | null>(null);

    useEffect(() => {
        getAllEvents().then((res: any) => {
            setEventData(res.data.find((e: any) => {
                return e.eventId === parseInt(id);
            }));
        })
    }, [id]);

	/*const handleClick = () => {
		removeEvent(params.id)
			.then((a: any) => {
				navigate('/events');
			})
			.catch((error) => {
				console.log(error);
			});
	};*/

	if (eventData?.departOrHome === 'Home') {
		headerHome = (<CardHeader
			className={'card-header isHome'}
			title={eventData?.sport + ': ' + eventData?.opponent}
			subheader={'Date: ' + getDateTimeAsJs(eventData?.eventDate)}
		/>)
		departHome = <CardContent className={'card-detail'}>Home</CardContent>;
	} else {
		headerHome = (<CardHeader
			className={'card-header'}
			title={eventData?.sport + ': ' + eventData?.opponent}
			subheader={'Date: ' + getDateTimeAsJs(eventData?.eventDate)}
		/>)
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {eventData?.departOrHome}
			</CardContent>
		);
	}

	return (
        /*I want to rework the layout of this page*/
		<Grid>
			<h1>Event Details</h1>
				{headerHome}
				<CardContent className={'card-content'}>
					<CardContent className={'card-detail'}>Time: {eventData?.time}</CardContent>
					{departHome}
				</CardContent>
				<CardContent className={'card-content'}>
					Players: Me and only me. Also John Howitzer
				</CardContent>
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
