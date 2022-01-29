import { Grid } from '@mui/material';
import { getAllEvents } from '../Services/EventService';
import { useEffect, useState } from 'react';
import { DeletedEventCard } from '../Components/DeletedEventCard';
import '../styles/eventsPage.scss';
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";

export const DeletedEventsPage: React.FC = () => {
	const [events, setEvents] = useState<any | null>(null);

	useEffect(() => {
		console.log(getAllEvents());
		getAllEvents()
			.then((res) => {
				let eventList = res.data.filter((e: any) => {
					return e.isDeleted === true;
				})
				console.log(eventList);
				setEvents(eventList);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
        <Grid>
            <h1>Deleted Events</h1>
			<Link to='/events'>
				<Button
					size='small'
					sx={{ backgroundColor: '#066A1F', color: 'white' }}
					variant={'outlined'}
				>
                    <FaBackward></FaBackward>
					Back to Events
				</Button>
			</Link>
            <Grid container spacing={3}>
                {events == null
                    ? 'There are no events to show'
                    : events.map((entry: any) => (
                            <Grid item key={entry['eventId']}>
                                <DeletedEventCard
                                    eventData={{
                                        eventId: entry['eventId'],
                                        sport: entry['sport'],
                                        opponent: entry['opponent'],
                                        date: entry['eventDate'],
                                        departOrHome: entry['homeOrAway'],
                                        destination: entry['destination'],
										departureTime: entry['departureTime'],
										arrivalTime: entry['arrivalTime'],
										comments: entry['comments'],
										isScrimmage: entry['isScrimmage']
                                    }}
                                />
                            </Grid>
                    ))}
            </Grid>
        </Grid>
	);
};
