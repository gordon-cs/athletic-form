import { Grid } from '@mui/material';
import { EventCard } from './Components/EventCard';

export const App = () => {
	return (
		<Grid container>
			<Grid item xs={4}>
				<EventCard />
			</Grid>
		</Grid>
	);
};
