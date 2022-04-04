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
import { UploadExcel } from './Views/UploadExcel';

export const App = () => {
	return (
		<Grid container sx={{ margin: '10px' }}>
			<Grid item>
				<Router>
					<Routes>
						<Route path = "/events" element = {<EventsPage />}/>
						<Route path = "coach/events" element = {<CoachEventsPage />}/>
						<Route path = "coach/events/:id/details" element = {<CoachEventDetails />}/>
						<Route path = "coach/events/:id/details/:email/classconflicts" element = {<ClassConflicts />}/>
						<Route path = "/events/add" element = {<AddEvent />}/>
						<Route path = "/events/:id/delete" element = {<DeleteEvent />}/>
						<Route path = "/events/:id/details" element = {<EventDetails />} />
						<Route path = "/events/:id/update" element = {<UpdateEvent />}/>
						<Route path = "/events/deleted" element = {<DeletedEventsPage />}/>
						<Route path = "/upload" element = {<UploadExcel />}/>
						<Route path = "/events/deleted/:id/recover" element = {<RecoverEvent />}/>
					</Routes>
				</Router>
			</Grid>
		</Grid>
	);
};
