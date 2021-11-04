import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { getAllEvents, addEventHandler } from '../Services/EventService';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {}

export const AddEvent : React.FC<Props> = () => {
    const [events, setEvents] = useState<any | null>(null);
    const [eventId, setEventId] = useState(0);
    const [athleticEvent, setAthleticEvent] = useState({ 
        event : { 
            sport: "",
            opponent: "",
            date: "",
            time: ""
        } 
    });

    useEffect(() => {
		getAllEvents().then((res) => {
            setEvents(res.data);
		});
    }, []);

    const handleChange = (e: any) => {
        console.log("Updating value");
    }

    const handleSubmit = () => {
    }
    return (
       <Grid>
           <h1>Add Event</h1>
           <form onSubmit = {handleSubmit}>
               <label>
                   Sport:
                   <input type = "text" value = { athleticEvent.event.sport } onChange = { handleChange }></input>
               </label>
               <br></br>
               <label>
                   Opponent:
                   <input type = "text" value = { athleticEvent.event.opponent } onChange = { handleChange }></input>
               </label>
               <br></br>
               <label>
                   Date:
                   <input type = "date" value = { athleticEvent.event.date } onChange = { handleChange }></input>
               </label>
               <br></br>
               <label>
                   Time: 
                   <input type = "time" value = { athleticEvent.event.time } onChange = { handleChange }></input>
               </label>
               <br></br>
               <input type = "submit" value="Save" />
               <Link to = "/events">
                   <Button>Cancel</Button>
               </Link>
           </form>
       </Grid>
    );
}