import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import '../styles/eventCard.scss';
interface Props {
	sport: any,
	opponent: any,
	date: any,
	time: any,
	departHome: any
}

export const EventCard: React.FC<Props> = (props) => {
	let departHome;
	if (props.departHome === "Home") {
		departHome = <CardContent className={'card-detail'}>Home</CardContent>
	} else {
		departHome = <CardContent className={'card-detail'}>Depart Time: {props.departHome}</CardContent>
	}
	return (
		<Card className={'card'} variant={'outlined'}>
			<CardHeader className={'card-header'} title={props.sport + ": " + props.opponent} />
			<CardContent className={'card-content'}>
				<CardContent className={'card-detail'}>Date: {props.date}</CardContent>
				<CardContent className={'card-detail'}>Time: {props.time}</CardContent>
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
