import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { getAllEvents, addEventHandler } from '../Services/EventService';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Event } from '../Models/Event';

interface Props {}

export const AddEvent : React.FC<Props> = () => {
    const [events, setEvents] = useState<any | null>(null);
    const [eventId, setEventId] = useState(0);
    const [sport, setSport] = useState("");
    const [opponent, setOpponent] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [homeOrDepart, setHomeOrDepart] = useState("");

    useEffect(() => {
		getAllEvents().then((res) => {
            setEvents(res.data);
		});
    }, []);

    console.log(events);

    const handleSubmit = () => {
        setEventId(Math.max(events.map((e: any) => e.Id)) + 1);
        let event : any = new Event(sport, opponent, date, time, homeOrDepart);
        addEventHandler(event, eventId).then((res) => {
            setEvents([...events, res.data]);
        });
    }

    return (
       <Grid>
           <h1>Add Event</h1>
           <form onSubmit = {handleSubmit}>
               <label>
                   Sport:
                   <input type = "text" value = { sport } 
                        onChange = { (e: any) => setSport(e.target.value) }>
                   </input>
               </label>
               <br></br>
               <label>
                   Opponent:
                   <input type = "text" value = { opponent } 
                        onChange = { (e: any) => setOpponent(e.target.value) }>
                   </input>
               </label>
               <br></br>
               <label>
                   Date:
                   <input type = "date" value = { date } 
                        onChange = { (e: any) => setDate(e.target.value) }></input>
               </label>
               <br></br>
               <label>
                   Time: 
                   <input type = "time" value = { time } 
                        onChange = { (e: any) => setTime(e.target.value) }></input>
               </label>
               <br></br>
               <label>
                   Home/Departure Time
                   <input type = "text" value = { homeOrDepart } 
                        onChange = { (e: any) => setHomeOrDepart(e.target.value) }></input>
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