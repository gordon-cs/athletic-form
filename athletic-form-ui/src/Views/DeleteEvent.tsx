import { Grid } from '@mui/material';
import '../styles/eventCard.scss';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllEvents, removeEvent } from '../Services/EventService';
import { Card, CardHeader, CardContent, Button, CardActions,
	Typography } from '@mui/material';
import '../styles/eventCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getDateTimeAsJs } from '../Helpers/DateTimeHelpers';

interface Props {}

export const DeleteEvent: React.FC<Props> = () => {
	const params: any = useParams();
	const id = params.id;
	const [eventData, setEventData] = useState<any | null>(null);
	let departHome;
	let headerHome;
	let arrival;
	let navigate = useNavigate();

	useEffect(() => {
		getAllEvents()
			.then((res) => {
				setEventData(
					res.data.find((e: any) => {
						return e.eventId === parseInt(id);
					}),
				);
			})
			.catch((error) => console.log(error.message));
	}, [id]);

	console.log(eventData);
	const handleClick = () => {
		removeEvent(params.id)
			.then((a: any) => {
				navigate("/events");
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	

	return (
			<div className="undoPopup">
				<h1 className="undoText">Undo Delete?</h1>
					<Button
						size={'small'}
						sx={{ backgroundColor: '#066A1F', color: 'white', left: '40%'}}
						variant={'outlined'}
						onClick={handleClick}
					>
						<FaPlusCircle></FaPlusCircle>
						Undo
					</Button>
			</div>
	);
};
