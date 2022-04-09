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
import { getRosterData, removeFromTeamRoster } from '../Services/EventService';

export const DeleteFromTeam = () => {
    const params = useParams();
    let sport : any = params.sport;
    let gordonId : any = params.gordonId;
    const [athlete, setAthlete] = useState<any | null>(null);
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
		if (token == undefined) {
			window.location.href = "..";
		}
        getRosterData(sport).then((res: any) => {
            setAthlete(res.data.find((e: any) => {
                return e.gordon_ID === gordonId;
            }))
        }).catch((error) => console.log(error.message));
    }, []);

    function handleClick() {
        removeFromTeamRoster(sport, gordonId).then(() => {
            navigate(`/teams/${sport}/rosterdata`);
            window.location.reload();
        }).catch((error) => console.log(error.message));
    }

    return (
        <Grid>
            <h1>Are you sure you want to delete {athlete?.firstName} {athlete?.lastName} from team {sport}?</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>{athlete?.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Last Name</TableCell>
                            <TableCell>{athlete?.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{athlete?.email}</TableCell>
                        </TableRow>
                    </TableBody>
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
