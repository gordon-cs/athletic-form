import { Grid } from '@mui/material';
import { EventsPage } from './Views/EventsPage';
import { AddEvent } from './Views/AddEvent';
import { DeleteEvent } from './Views/DeleteEvent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UpdateEvent } from './Views/UpdateEvent';

export const App = () => {
	return (
		<Grid container sx={{ margin: '10px' }}>
			<Grid item>
				<Router>
					<Routes>
						<Route path = "/events" element = {<EventsPage />}/>
						<Route path = "/events/add" element = {<AddEvent />}/>
						<Route path = "/events/:id/delete" element = {<DeleteEvent />}/>
						<Route path = "/events/:id/update" element = {<UpdateEvent />}/>
					</Routes>
				</Router>
			</Grid>
		</Grid>
	);
};
