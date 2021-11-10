import { Grid } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents } from "../Services/EventService";
import { Card, CardHeader, CardContent, Button } from "@mui/material";
import "../styles/eventCard.scss";

interface Props {}

export const DeleteEvent : React.FC<Props> = () => {
    const params : any = useParams();
    const index = params.id - 1;
    const [eventData, setEventData] = useState<any | null>(null);
    let departHome;

    useEffect(() => {
		getAllEvents()
			.then((res) => {
                console.log(res.data[index]);
				setEventData(res.data[index]);
			}).catch((error) => console.log(error.message));
    }, [index]);

    console.log(eventData);

    if (eventData.departOrHome === 'Home') {
		departHome = <CardContent className={'card-detail'}>Home</CardContent>;
	} else {
		departHome = (
			<CardContent className={'card-detail'}>
				Depart Time: {eventData.departOrHome}
			</CardContent>
		);
	}

    return (
        <Grid>
            <h1>Are you sure you want to delete this event?</h1>
           <Card className={'card'} variant={'outlined'}>
                <CardHeader
                    className={'card-header'}
                    title={eventData.sport + ': ' + eventData.opponent}
                    subheader={'Date: ' + eventData.date}
                />
                <CardContent className={'card-content'}>
                    <CardContent className={'card-detail'}>Time: {eventData.time}</CardContent>
                    {departHome}
                </CardContent>
            </Card>
            <Button size='small'
				sx={{ backgroundColor: 'green', color: 'white' }}
				variant={'outlined'}>
                Yes
            </Button>
            <Button size='small'
				sx={{ backgroundColor: 'red', color: 'white' }}
				variant={'outlined'}>
                No
            </Button>
        </Grid>
    );
}