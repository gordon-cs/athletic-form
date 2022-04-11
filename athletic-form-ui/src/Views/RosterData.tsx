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
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

interface Props {}

export const RosterData: React.FC<Props> = () => {
    const params = useParams();
    let sport : any = params.sport;
    const [rosterData, setRosterData] = useState<any | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
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
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rosterData?.map((athlete: any) => (
                            <TableRow>
                                <TableCell>{athlete.email}</TableCell>
                                <TableCell>{athlete.firstName}</TableCell>
                                <TableCell>{athlete.lastName}</TableCell>
                                <TableCell>
                                    <Link to={`/teams/${sport}/rosterdata/${athlete.gordon_ID}/delete`}>
                                        <Button
                                            size='small'
                                            sx={{ backgroundColor: '#710F0F', color: 'white' }}
                                            variant={'outlined'}
                                        >
                                            <FaTrashAlt></FaTrashAlt>
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to={`/teams/${sport}/rosterdata/add`}>
			    <Button
				    size='large'
				    sx={{ backgroundColor: '#710F0F', color: 'white' }}
					variant={'outlined'}
				>
				    <FaPlusCircle></FaPlusCircle>
				</Button>
			</Link>
            <br></br>
            <br></br>
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