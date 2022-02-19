import { Grid } from '@mui/material';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import '../styles/login.scss';


export const LoginPage: React.FC = () => {

    const [username, setUsername] = useState<any | null>(null);
    const [password, setPassword] = useState<any | null>(null);

    const handleLogin = async () => {
		console.log("User attempted to log into the application.");

        const loginInfo = new URLSearchParams({
            username: username,
            password: password,
            grant_type: 'password',
        });
        
        const request = new Request(`https://360Api.gordon.edu/token`, {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //mode: 'no-cors',
            credentials: 'include',
            body: loginInfo,
        });
        
        let token = await fetch(request).then(response => response.json()).then(data => data.access_token);

        try {
            console.log("Bearer ", token.toString());
            // Store the token
            localStorage.setItem('token', token.toString());

            if( token.toString().startsWith('ey') ){
                // Redirect to home page
                window.location.href = "/events";
            }
        } catch {
            alert("Invalid credentials!");
        }
	};

    return (<Grid>
                <Box 
                height="100vh" width="100vh"
                display="flex" flexDirection="column"
                alignItems="center"
                justifyContent="center">

                    <h1>Athletic Form</h1>

                    <TextField
					value={username}
                    label='Username'
					onChange={(e: any) => {
						setUsername(e.target.value);
					}}
                    />
                    <TextField
                    type={'password'}
					value={password}
                    label='Password'
					onChange={(e: any) => {
						setPassword(e.target.value);
					}}
                    />
                    <h4> </h4>
                    <Button
                        onClick={handleLogin}
                        variant='contained'
                        size='large'
                        className="button"
                    >Login</Button>
                </Box>
            </Grid>
    )
}
