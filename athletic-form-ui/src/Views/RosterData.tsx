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
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRosterData } from '../Services/EventService';

interface Props {}

export const RosterData: React.FC<Props> = () => {
    const params = useParams();
    let sport : any = params.sport;
    const [rosterData, setRosterData] = useState<any | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
		// TODO: Add timeout validation on redirect
		if (token == undefined) {
			window.location.href = "..";
		}
        getRosterData(sport).then((res: any) => {
            console.log(res.data);
            setRosterData(res.data);
        }).catch((error) => console.log(error));
    }, []);

    return (
        <Grid>
            <h1>Roster Data for {sport}</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rosterData?.map((athlete: any) => (
                            <TableRow>
                                <TableCell>{athlete.email}</TableCell>
                                <TableCell>{athlete.firstName}</TableCell>
                                <TableCell>{athlete.lastName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to='/teams'>
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