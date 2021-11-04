import { Grid } from '@mui/material';
import { EventsPage } from './Views/EventsPage';
import { AddEvent } from './Views/AddEvent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = () => {
	return (
		<Grid container sx={{ margin: '10px' }}>
			<Grid item>
				<Router>
					<Routes>
						<Route path = "/events" element = {<EventsPage />}/>
						<Route path = "/events/add" element = {<AddEvent />}/>
					</Routes>
				</Router>
			</Grid>
		</Grid>
	);
};
