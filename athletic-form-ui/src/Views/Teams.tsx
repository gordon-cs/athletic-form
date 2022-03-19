import { 
    Grid, 
    Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from "@mui/material";
import { useEffect, useState } from 'react';
import { getAllTeams } from '../Services/EventService';

interface Props {}

export const Teams: React.FC<Props> = () => {
    const [teams, setTeams] = useState<any | null>(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
		// TODO: Add timeout validation on redirect
		if (token == undefined) {
			window.location.href = "..";
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
                                <TableCell key={team.teamName}>{team.teamName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}