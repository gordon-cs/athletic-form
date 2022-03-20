import { Grid } from '@mui/material';
import { EventsPage } from './Views/EventsPage';
import { AddEvent } from './Views/AddEvent';
import { DeleteEvent } from './Views/DeleteEvent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EventDetails } from './Views/EventDetails';
import { UpdateEvent } from './Views/UpdateEvent';
import { CoachEventsPage } from './Views/CoachEventsPage';
import { DeletedEventsPage } from './Views/DeletedEventsPage';
import { RecoverEvent } from './Views/RecoverEvent';
import { CoachEventDetails } from './Views/CoachEventDetails';
import { ClassConflicts } from './Views/ClassConflicts';
import { LoginPage } from './Views/LoginPage';
import { Teams } from './Views/Teams';
import { RosterData } from './Views/RosterData';
import { AddToTeam } from './Views/AddToTeam';

export const App = () => {
	return (
		<Grid container sx={{ margin: '10px' }}>
			<Grid item>
				<Router>
					<Routes>
						<Route path = "" element = {<LoginPage />}/>
						<Route path = "/events" element = {<EventsPage />}/>
						<Route path = "coach/events" element = {<CoachEventsPage />}/>
						<Route path = "coach/events/:id/details" element = {<CoachEventDetails />}/>
						<Route path = "coach/events/:id/details/:email/:yearCode/:termCode/classconflicts" element = {<ClassConflicts />}/>
						<Route path = "/events/add" element = {<AddEvent />}/>
						<Route path = "/events/:id/delete" element = {<DeleteEvent />}/>
						<Route path = "/events/:id/details" element = {<EventDetails />} />
						<Route path = "/events/:id/update" element = {<UpdateEvent />}/>
						<Route path = "/events/deleted" element = {<DeletedEventsPage />}/>
						<Route path = "/events/deleted/:id/recover" element = {<RecoverEvent />}/>
						<Route path = "/teams" element = {<Teams />} />
						<Route path = "/teams/:sport/rosterdata" element={<RosterData />}/>
						<Route path = "/teams/:sport/rosterdata/add" element={<AddToTeam />}/>
					</Routes>
				</Router>
			</Grid>
		</Grid>
	);
};
