import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import '../styles/eventCard.scss';
interface Props {}

export const EventCard: React.FC<Props> = () => {
	return (
		<Card className={'card'} variant={'outlined'}>
			<CardHeader className={'card-header'} title={'Test'} />
			<CardContent className={'card-content'}>
				<Typography>Does this work?</Typography>
				<Typography>How about this?</Typography>
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
