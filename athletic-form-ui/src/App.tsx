import { Grid } from '@mui/material';
import { EventsPage } from './Views/EventsPage';

export const App = () => {
	return (
		<Grid container sx={{ margin: '10px' }}>
			<Grid item>
				<EventsPage />
			</Grid>
		</Grid>
	);
};
