import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import '../styles/eventCard.scss';
interface Props {}

export const EventCard: React.FC<Props> = (props) => {
	return (
		<Card className={'card'} variant={'outlined'}>
			<CardHeader className={'card-header'} title={'Rowing: Head of the Charles'} />
			<CardContent className={'card-content'}>
				<CardContent className={'card-detail'}>Date: 2021-10-24</CardContent>
				<CardContent className={'card-detail'}>Time: 12:15 PM</CardContent>
				<CardContent className={'card-detail'}>Depart Time: 10:00 AM</CardContent>
			</CardContent>
			<CardActions className={'card-content card-action'}>
				<Button sx={{ backgroundColor: '#710F0F', color: 'white' }} variant={'outlined'}>
					Delete
				</Button>
				<Button sx={{ backgroundColor: '#066A1F', color: 'white' }} variant={'outlined'}>
					Update
				</Button>
			</CardActions>
		</Card>
	);
};
