import { Grid, TextField, Button } from "@mui/material"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { addCoachToTeamRoster, getAccountByEmail, getRosterData } from "../Services/EventService";

export const AddCoachToTeam = () => {
    const params = useParams();
    let TeamName : any = params.sport;
    const [rosterData, setRosterData] = useState<any | null>(null);
    const [email, setEmail] = useState('');
    const [account, setAccount] = useState<any | null>(null);
    const [title, setTitle] = useState('');
    let errorMessage;
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
		if (token == undefined) {
			window.location.href = "..";
		}
        getRosterData(TeamName).then((res: any) => {
            console.log(res.data);
            setRosterData(res.data);
        }).catch((error) => console.log(error));
    }, [])

    const handleSubmit = () => {
        getAccountByEmail(email).then((res) => {
            console.log(res.data);
            if (res.data === null) {
                errorMessage = "No coach with this name exists";
            } else {
                setAccount(res.data);
                console.log(account);
                if (account != null) {
                    if (account?.gordon_ID === null) {
                        errorMessage = "No coach with this name exists";
                    } else if (onTeam(email)) {
                        errorMessage = "This coach is already on the team";
                    } else {
                        addCoachToTeamRoster({TeamName: TeamName, Gordon_ID: account?.gordon_ID, CoachTitle: title }).then(() => {
                            navigate(`/teams/${TeamName}/rosterdata`);
                            window.location.reload();
                        }).catch((error) => console.log(error));
                    }
                }
            }
        }).catch((error) => console.log(error));
    }

    function onTeam(athleteEmail: String) {
        let emails : any = [];
        let playerOnTeam = false;
        rosterData?.map((player: any) => {
            emails.push(player.email); 
        });
        if (emails.includes(athleteEmail)) {
            playerOnTeam = true;
        }
        return playerOnTeam;
    }

    return (
        <Grid>
            <h1>Add to Team {TeamName} </h1>
            <h2>Enter Email of Coach Joining the Team and Title of Coach</h2>
            <form>
                <TextField 
                    value={email}
                    label="Email"
                    onChange={(e: any) => {
                        setEmail(e.target.value);
                    }}
                />
                <br></br>
                <TextField 
                    value={title}
                    label="Title"
                    onChange={(e: any) => {
                        setTitle(e.target.value);
                    }}
                />
                <br></br>
                <p style={{color: "red"}}>{errorMessage}</p>
                <br></br>
                <Button
					size='small'
					sx={{ backgroundColor: 'green', color: 'white' }}
					variant={'outlined'}
                    onClick={handleSubmit}
				>
					Save
				</Button>
				<Link to={`/teams/${TeamName}/rosterdata`}>
					<Button
						size='small'
						sx={{ backgroundColor: 'red', color: 'white' }}
						variant={'outlined'}
					>
						Cancel
					</Button>
				</Link>
            </form>
        </Grid>
    );
}