import { Grid, Alert } from '@mui/material';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import '../styles/login.scss';


export const LoginPage: React.FC = () => {

    const [email, setEmail] = useState<any | null>(null);
    const [password, setPassword] = useState<any | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const handleLogin = async () => {
		console.log("User attempted to log into the application.");
        // Username set in try block
        let username = email;
        try {
            const usernameArray = email.split("@");
            username = usernameArray[0];
            // If not a valid email, fail the try-catch
            if (usernameArray[1] !== 'gordon.edu') { throw new Error("Invalid email address.")}
        } catch {
            // Show invalid email error messages
            setShowAlert(false);
            setUsernameError(true);
            setTimeout(() => {
                setUsernameError(false)
            }, 12000);
            return;
        }

        // Format request body with credentials
        const loginInfo = new URLSearchParams({
            username: username,
            password: password,
            grant_type: 'password',
        });
        
        // Create request to 360 auth server
        const request = new Request(`https://360Api.gordon.edu/token`, {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //mode: 'no-cors',
            credentials: 'include',
            body: loginInfo,
        });

        // Retrieve JWT Token
        let token = await fetch(request).then(response => response.json()).then(data => data.access_token);
        
        // Check if 360 backend authorized
        if(token != undefined) {
            // Store the token to use as header
            localStorage.setItem('token', "Bearer " + token.toString());
            // Store email to lookup user roles
            localStorage.setItem('email', email);

            // Redirect to home screen (TODO: redirect based on user role)
            window.location.href = "/events";
        }
        else // Failed to authenticate
        {
            // Show username/password error messages
            setUsernameError(false);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
            }, 12000);

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
					value={email}
                    label='Email'
					onChange={(e: any) => {
						setEmail(e.target.value);
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
                    <h1> </h1>
                    { showAlert && (<Alert severity="error" >Your username or password was incorrect.</Alert>)}
                    { usernameError && (<Alert severity="error" >Please enter a valid Gordon email address.</Alert>)}
                </Box>
            </Grid>
    )
}
