import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import '../styles/eventCard.scss';
import { Event } from '../Models/Event';
interface Props {
	eventData: Event;
}

export const EventCard: React.FC<Props> = ({ eventData }) => {
	let departHome;
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
