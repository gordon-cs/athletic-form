import { 
    Grid,
    Paper,
	TableContainer,
	Table,
	TableRow,
	TableCell,
	TableBody,
    Button
} from '@mui/material'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getCoachRosterData, removeCoachFromTeamRoster } from '../Services/EventService';

export const DeleteCoachFromTeam = () => {
    const params = useParams();
    let sport : any = params.sport;
    let gordonId : any = params.gordonId;
    const [coach, setCoach] = useState<any | null>(null);
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
		if (token == undefined) {
			window.location.href = "..";
		}
        getCoachRosterData(sport).then((res: any) => {
            setCoach(res.data.find((e: any) => {
                return e.gordon_ID === gordonId;
            }))
        }).catch((error) => console.log(error.message));
    }, []);

    function handleClick() {
        removeCoachFromTeamRoster(sport, gordonId).then(() => {
            navigate(`/teams/${sport}/rosterdata`);
            window.location.reload();
        }).catch((error) => console.log(error.message));
    }

    return (
        <Grid>
            <h1>Are you sure you want to delete {coach?.firstName} {coach?.lastName} from team {sport}?</h1>
            <TableContainer component={Paper}>
                <Table>
                    {coach && 
                        <TableBody>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>{coach?.firstName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Last Name</TableCell>
                                <TableCell>{coach?.lastName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{coach?.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>{coach?.coachTitle}</TableCell>
                            </TableRow>
                        </TableBody>
                    }
                </Table>
            </TableContainer>
            <Button
				size='small'
				sx={{ backgroundColor: 'green', color: 'white' }}
				variant={'outlined'}
				onClick={handleClick}
			>
				Yes
			</Button>
			<Link to={`/teams/${sport}/rosterdata`}>
				<Button
					size='small'
					sx={{ backgroundColor: 'red', color: 'white' }}
					variant={'outlined'}
				>
					No
				</Button>
			</Link>
        </Grid>
    );
}