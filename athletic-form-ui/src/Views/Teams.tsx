import { 
    Grid, 
    Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
    Button
} from "@mui/material";
import { useEffect, useState } from 'react';
import { getAllTeams } from '../Services/EventService';
import { Link } from 'react-router-dom';

interface Props {}

export const Teams: React.FC<Props> = () => {
    const [teams, setTeams] = useState<any | null>(null);
    const [previousPage, setPreviousPage] = useState<string>("");
    
    useEffect(() => {
        const token = localStorage.getItem('token');
		if (token == undefined) {
			window.location.href = "..";
		} else {
            let role = JSON.parse(atob(token.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            if (role == "Scheduler") {
                setPreviousPage("/events");
            } else {
                setPreviousPage("/coach/events");
            }
        }
        getAllTeams().then((res: any) => {
            setTeams(res.data);
        }).catch((error) => console.log(error));
    }, []);

    return (
        <Grid>
            <h1>Teams</h1>
            <TableContainer component={Paper}>
                <Table sx={{ width: 1000 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Team Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams?.map((team: any) => (
                            <TableRow>
                                <Link to={`/teams/${team.teamName}/rosterdata`}>
                                    <TableCell key={team.teamName}>{team.teamName}</TableCell>
                                </Link>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to={previousPage}>
				<Button
					size='small'
					sx={{ backgroundColor: 'red', color: 'white' }}
					variant={'outlined'}
				>
					Back
				</Button>
			</Link>
        </Grid>
    );
}