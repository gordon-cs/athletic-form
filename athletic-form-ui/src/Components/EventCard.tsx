import { Card, CardHeader, Typography } from '@mui/material';

interface Props {}

export const EventCard: React.FC<Props> = () => {
	return (
		<Card
			sx={{
				width: '200px',
				height: '200px ',
				bgcolor: '#174354',
			}}
		>
			<CardHeader
				sx={{
					color: 'white',
				}}
				title={'Hello, World'}
			/>
		</Card>
	);
};
